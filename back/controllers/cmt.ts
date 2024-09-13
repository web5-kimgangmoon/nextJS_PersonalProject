import { Request, Response, Router } from "express";
import { getUserInfo, login } from "../queries/user";
import { booleanCheck, intCheck, stringCheck } from "../services/zod";
import { getCmts } from "../queries/cmt";

const router = Router();

router.get("/cmtList", async (req: Request, res: Response) => {
  const limit = intCheck.safeParse(req.query.limit).success
    ? Number(req.query.limit)
    : 10;
  const userId = booleanCheck.safeParse(req.query.isOwn).success
    ? req.query.isOwn === "true"
      ? req?.session?.userId
      : undefined
    : undefined;
  const isDeleted = booleanCheck.safeParse(req.query.isDeleted).success
    ? req.query.isDeleted === "true"
    : false;
  const onlyDeleted = booleanCheck.safeParse(req.query.onlyDeleted).success
    ? req.query.onlyDeleted === "true"
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
    })
  );
});

router.post("/", async (req: Request, res: Response) => {
  req.session.userId
    ? res.send({ userInfo: await getUserInfo(req.session.userId) })
    : res.send({ userInfo: undefined });
});

router.post("/like/:cmtId", async (req: Request, res: Response) => {
  req.session.userId
    ? res.send({ userInfo: await getUserInfo(req.session.userId) })
    : res.send({ userInfo: undefined });
});
router.post("/report/:cmtId", async (req: Request, res: Response) => {
  req.session.userId
    ? res.send({ userInfo: await getUserInfo(req.session.userId) })
    : res.send({ userInfo: undefined });
});
router.patch("/:cmtId", async (req: Request, res: Response) => {
  req.session.userId
    ? res.send({ userInfo: await getUserInfo(req.session.userId) })
    : res.send({ userInfo: undefined });
});
router.delete("/:cmtId", async (req: Request, res: Response) => {
  req.session.userId
    ? res.send({ userInfo: await getUserInfo(req.session.userId) })
    : res.send({ userInfo: undefined });
});

export default router;
