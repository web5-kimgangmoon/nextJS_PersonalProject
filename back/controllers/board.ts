import { Request, Response, Router } from "express";
import { booleanCheck, intCheck, stringCheck } from "../services/zod";
import {
  addBoard,
  deleteBoard,
  getBoard,
  getBoardList,
  giveScore,
  reportBoard,
  updateBoard,
} from "../queries/board";
import { upload } from "../services/upload";

const router = Router();

router.get("/list", async (req: Request, res: Response) => {
  const category = stringCheck.safeParse(req.query.category).success
    ? stringCheck.parse(req.query.category)
    : null;

  const offset = intCheck.safeParse(req.query.offset).success
    ? Number(req.query.offset)
    : 0;
  const limit = intCheck.safeParse(req.query.limit).success
    ? Number(req.query.limit)
    : 10;
  const ownId = booleanCheck.safeParse(req.query.isOwn).success
    ? req.query.isOwn === "true"
      ? req?.session?.userId
      : undefined
    : undefined;

  const writerId = intCheck.safeParse(req.query.writerId).success
    ? Number(req.query.writerId)
    : ownId;

  const isDeleted = booleanCheck.safeParse(req.query.isDeleted).success
    ? req.query.isDeleted === "true"
    : false;
  const search = stringCheck.safeParse(req.query.search).success
    ? stringCheck.parse(req.query.search)
    : undefined;
  const searchType = stringCheck.safeParse(req.query.searchType).success
    ? stringCheck.parse(req.query.searchType)
    : undefined;
  const onlyDeleted = booleanCheck.safeParse(req.query.onlyDeleted).success
    ? req.query.onlyDeleted === "true"
    : false;
  if (!req.session.isAdminLogin && (isDeleted || onlyDeleted)) {
    res.status(403).send({ message: "no authority" });
    return;
  }
  res.send(
    await getBoardList(
      category,
      offset,
      limit,
      writerId,
      isDeleted,
      search,
      searchType,
      onlyDeleted
    )
  );
});
router.post("/eval/:boardId", async (req: Request, res: Response) => {
  const userId = req?.session?.userId ? req?.session?.userId : undefined;
  const boardId = intCheck.safeParse(req.params.boardId).success
    ? Number(req.params.boardId)
    : undefined;
  const score = intCheck.safeParse(req.body.score).success
    ? Number(req.body.score)
    : undefined;
  (await giveScore(userId, boardId, score))
    ? res.status(204).send()
    : res.status(403).send();
});
router.post("/report/:boardId", async (req: Request, res: Response) => {
  const userId = req?.session?.userId ? req?.session?.userId : undefined;
  const boardId = intCheck.safeParse(req.params.boardId).success
    ? Number(req.params.boardId)
    : undefined;
  const reportReasonId = intCheck.safeParse(req.body.reportReasonId).success
    ? Number(req.body.reportReasonId)
    : undefined;
  (await reportBoard(userId, boardId, reportReasonId))
    ? res.status(204).send()
    : res.status(400).send();
});
router.get("/:boardId", async (req: Request, res: Response) => {
  const boardId = intCheck.safeParse(req.params.boardId).success
    ? intCheck.parse(req.params.boardId)
    : 0;
  const board = await getBoard(boardId, req.session.userId);
  board ? res.send(board) : res.status(404).send();
});

router.patch(
  "/:boardId",
  upload("img"),
  async (req: Request, res: Response) => {
    const userId = req?.session?.userId;
    const boardId = intCheck.safeParse(req.params.boardId).success
      ? Number(req.params.boardId)
      : undefined;
    if (!userId) {
      res.status(403).send("비로그인 상태입니다");
      return;
    }
    if (!req.body.content || !req.body.description || !req.body.title) {
      res.status(400).send("정해진 형식을 지켜주세요");
      return;
    }
    const result = await updateBoard(
      userId,
      boardId,
      req.body.title,
      req.body.content,
      req.body.description,
      req.file?.filename,
      req.session.isAdminLogin
    );
    if (typeof result === "string") {
      res.status(400).send(result);
    } else res.status(204).send();
  }
);
router.delete("/:boardId", async (req: Request, res: Response) => {
  const userId = req?.session?.userId;
  const boardId = intCheck.safeParse(req.params.boardId).success
    ? Number(req.params.boardId)
    : undefined;
  if (!userId) {
    res.status(403).send("비로그인 상태입니다");
    return;
  }

  const result = await deleteBoard(userId, boardId, req.session.isAdminLogin);
  if (typeof result === "string") {
    res.status(400).send(result);
  } else res.status(204).send();
});
router.post("/", upload("img"), async (req: Request, res: Response) => {
  const userId = req?.session?.userId;
  if (!userId) {
    res.status(403).send("비로그인 상태입니다");
    return;
  }
  if (
    !req.body.content ||
    !req.body.description ||
    !req.body.title ||
    !req.body.category
  ) {
    res.status(400).send("정해진 형식을 지켜주세요");
    return;
  }
  const result = await addBoard(
    userId,
    req.body.title,
    req.body.content,
    req.body.description,
    req.body.category,
    req.file?.filename,
    req.session.isAdminLogin
  );
  if (typeof result === "string") {
    res.status(400).send(result);
  } else res.status(204).send();
});
export default router;
