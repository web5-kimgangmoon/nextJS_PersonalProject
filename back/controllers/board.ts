// category: string |
//                "inform" |
//                null,
// offset: number,
// limit: number,
// isOwn: boolean,
// isDeleted: boolean,
// search: string |
//              null,
// searchType: "content" |
//                      "title" |
//                      "contentTitle" |
//                      null
import { Request, Response, Router } from "express";
import { booleanCheck, intCheck, stringCheck } from "../services/zod";
import {
  getBoard,
  getBoardList,
  giveScore,
  reportBoard,
} from "../queries/board";

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
  const writerId = booleanCheck.safeParse(req.query.isOwn).success
    ? req.query.isOwn === "true"
      ? req?.session?.userId
      : undefined
    : undefined;
  const isDeleted = booleanCheck.safeParse(req.query.isDeleted).success
    ? req.query.isDeleted === "true"
    : false;
  const search = stringCheck.safeParse(req.query.search).success
    ? stringCheck.parse(req.query.search)
    : undefined;
  const searchType = stringCheck.safeParse(req.query.searchType).success
    ? stringCheck.parse(req.query.searchType)
    : undefined;
  if (!req.session.isAdminLogin && isDeleted) {
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
      searchType
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

export default router;
