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
import { getBoardList } from "../queries/board";

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
  //   res.send({ ...(await getCategoryList()) });
});

export default router;
