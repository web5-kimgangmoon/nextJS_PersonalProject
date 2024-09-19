import { Request, Response, Router } from "express";
import { getReasonList } from "../queries/reason";

const router = Router();

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
  const reasonList = await getReasonList(reasonType);
  reasonList ? res.send({ reasonList }) : res.status(400).send(undefined);
});

export default router;
