import { Request, Response, Router } from "express";
import { getUserInfo } from "../queries/user";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  req.session.userId
    ? res.send({ userInfo: await getUserInfo(req.session.userId) })
    : res.send({ userInfo: undefined });
});

export default router;
