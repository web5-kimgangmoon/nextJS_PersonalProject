import { Request, Response, Router } from "express";
import { booleanCheck, intCheck, stringCheck } from "../services/zod";
import { getBoard, getBoardList } from "../queries/board";
import { getReasonList } from "../queries/reason";

const router = Router();

// reasonType: "BAN" |
//                      "CMT_REPORT" |
//                      "CMT_DELETE" |
//                      "BOARD_DELETE"|
//                      "BOARD_REPORT"
router.get("/list", async (req: Request, res: Response) => {
  const temp = req.query.reasonType;
  const reasonType = [
    "BAN",
    "CMT_REPORT",
    "CMT_DELETE",
    "BOARD_DELETE",
    "BOARD_REPORT",
  ].find((item) => item === temp)
    ? (temp as string)
    : null;
  console.log(reasonType);
  const reasonList = await getReasonList(reasonType);
  reasonList ? res.send(reasonList) : res.status(400).send(undefined);
  //   res.send({ ...(await getCategoryList()) });
});

export default router;
