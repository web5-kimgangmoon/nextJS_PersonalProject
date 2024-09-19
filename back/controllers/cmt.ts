import { Request, Response, Router } from "express";
import { getUserInfo, login } from "../queries/user";
import { booleanCheck, intCheck, stringCheck } from "../services/zod";
import {
  addCmt,
  deleteCmt,
  getCmts,
  likeCmt,
  reportCmt,
  updateCmt,
} from "../queries/cmt";
import z from "zod";

const router = Router();

router.post("/like/:cmtId", async (req: Request, res: Response) => {
  const userId = req?.session?.userId ? req?.session?.userId : undefined;
  const cmtId = intCheck.safeParse(req.params.cmtId).success
    ? Number(req.params.cmtId)
    : undefined;
  const isDislike = z.boolean().safeParse(req.body.isDislike).success
    ? req.body.isDislike
    : false;
  (await likeCmt(userId, cmtId, isDislike))
    ? res.status(204).send()
    : res.status(400).send();
});
router.post("/report/:cmtId", async (req: Request, res: Response) => {
  const userId = req?.session?.userId ? req?.session?.userId : undefined;
  const cmtId = intCheck.safeParse(req.params.cmtId).success
    ? Number(req.params.cmtId)
    : undefined;
  const reportReasonId = intCheck.safeParse(req.body.reportReasonId).success
    ? Number(req.body.reportReasonId)
    : undefined;
  (await reportCmt(userId, cmtId, reportReasonId))
    ? res.status(204).send()
    : res.status(400).send();
});

router.get("/cmtList", async (req: Request, res: Response) => {
  const limit = intCheck.safeParse(req.query.limit).success
    ? Number(req.query.limit)
    : 10;
  const userId = req?.session?.userId ? req?.session?.userId : undefined;

  const isOwn = booleanCheck.safeParse(req.query.isOwn).success
    ? req.query.isOwn === "true"
      ? true
      : false
    : false;
  const isDeleted = booleanCheck.safeParse(req.query.isDeleted).success
    ? req.query.isDeleted === "true"
    : false;
  const onlyDeleted = booleanCheck.safeParse(req.query.onlyDeleted).success
    ? req.query.onlyDeleted === "true"
      ? true
      : false
    : false;
  const search = stringCheck.safeParse(req.query.search).success
    ? stringCheck.parse(req.query.search)
    : undefined;
  const searchType = stringCheck.safeParse(req.query.searchType).success
    ? stringCheck.parse(req.query.searchType)
    : undefined;
  const boardId = intCheck.safeParse(req.query.boardId).success
    ? Number(req.query.boardId)
    : null;
  const writerId = intCheck.safeParse(req.query.writerId).success
    ? Number(req.query.writerId)
    : undefined;
  const isFlat = booleanCheck.safeParse(req.query.isFlat).success
    ? req.query.isFlat === "true"
      ? true
      : false
    : false;
  const sort = stringCheck.safeParse(req.query.sort).success
    ? stringCheck.parse(req.query.sort)
    : undefined;
  if (!req.session.isAdminLogin && (isDeleted || onlyDeleted)) {
    res.status(403).send({ message: "no authority" });
    return;
  }
  res.send(
    await getCmts({
      boardId: boardId,
      isDeleted: isDeleted,
      limit: limit,
      onlyDeleted: onlyDeleted,
      search: search,
      searchType: searchType,
      sort: sort,
      userId: userId,
      isOwn,
      writerId,
      isFlat,
    })
  );
});

router.delete("/:cmtId", async (req: Request, res: Response) => {
  const userId = req?.session?.userId ? req?.session?.userId : undefined;
  const cmtId = intCheck.safeParse(req.params.cmtId).success
    ? Number(req.params.cmtId)
    : undefined;

  (await deleteCmt(userId, cmtId))
    ? res.status(204).send()
    : res.status(400).send();
});

router.patch("/:cmtId", async (req: Request, res: Response) => {
  const userId = req?.session?.userId;
  const cmtId = Number(req.params.cmtId);
  const isDeleteImg = req.body.isDeleteImg ? true : false;
  if (
    !userId ||
    !stringCheck.safeParse(req.body.content).success ||
    (!req.body.content && !req.body.img) ||
    !cmtId
  ) {
    res.status(403).send();
    return;
  }
  (await updateCmt(
    userId as number,
    cmtId as number,
    isDeleteImg,
    req.body.content,
    req.body.img
  ))
    ? res.status(204).send()
    : res.status(400).send();
});

router.post("/", async (req: Request, res: Response) => {
  const replyId = intCheck.safeParse(req.query.replyId).success
    ? Number(req.query.replyId)
    : undefined;
  const userId = req?.session?.userId ? req?.session?.userId : undefined;
  const boardId = intCheck.safeParse(req.query.boardId).success
    ? Number(req.query.boardId)
    : undefined;
  if (
    !userId ||
    (!boardId && !replyId) ||
    !stringCheck.safeParse(req.body.content).success ||
    (!req.body?.content && !req.body?.img)
  ) {
    res.status(403).send();
    return;
  }
  res.send(
    await addCmt(
      { boardId: boardId, replyId, userId: req.session.userId as number },
      req.body.content,
      req.body.img
    )
  );
});

export default router;
