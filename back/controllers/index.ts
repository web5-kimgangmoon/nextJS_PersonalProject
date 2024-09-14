import { Request, Response, Router } from "express";
import path from "path";

import { banCheck } from "../queries";

import category from "./category";
import user from "./user";
import board from "./board";
import reason from "./reason";
import cmt from "./cmt";
import { getCategoryList } from "../queries/category";

const router = Router();

router.use(async (req: Request, res: Response, next) => {
  req.ban = await banCheck(req.session.userId);
  req.ban && req.session.destroy((err) => console.log(err));
  next();
});
router.get("/img", (req, res) => {
  res.sendFile(path.join(__dirname, `../public/${req.query.name}`));
});
router.get("/categories", async (req: Request, res: Response) => {
  res.send({ ...(await getCategoryList()) });
});

router.use("/category", category);
router.use("/user", user);
router.use("/board", board);
router.use("/reason", reason);
router.use("/cmt", cmt);
export default router;
