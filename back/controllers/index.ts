import { Request, Response, Router } from "express";
import path from "path";
import fs from "fs";

import { banCheck } from "../queries";

import category from "./category";
import user from "./user";
import board from "./board";
import reason from "./reason";
import cmt from "./cmt";
import { getCategoryList } from "../queries/category";
import { upload } from "../services/upload";
import { intCheck } from "../services/zod";

const router = Router();

router.use(async (req: Request, res: Response, next) => {
  const ban = await banCheck(req.session.userId);
  ban && req.session.destroy((err) => console.log(err));
  next();
});
router.get("/img", (req, res) => {
  res.sendFile(path.join(__dirname, `../public/${req.query.name}`));
});
router.get("/categories", async (req: Request, res: Response) => {
  res.send({ ...(await getCategoryList()) });
});

router.post("/imgUpload", upload("img"), (req, res) => {
  try {
    const current = intCheck.safeParse(req.body.current).success
      ? Number(req.body.current)
      : undefined;
    const end = intCheck.safeParse(req.body.end).success
      ? Number(req.body.end)
      : undefined;
    const file = req.file ? req.file : undefined;
    if (!current || !end || !file) {
      res.status(400).send();
      return;
    }
    const targetPath = path.join(
      __dirname,
      "../",
      "./public",
      file.originalname
    );
    fs.appendFileSync(targetPath, fs.readFileSync(file.path));
    fs.unlinkSync(file.path);

    current === end ? res.status(200).send() : res.status(204).send();
  } catch (err) {
    // const file = req.file ? req.file : undefined;
    // if (file) {
    //   fs.unlinkSync(file.path);
    //   fs.unlinkSync(path.join(__dirname, "../", "./public", file.originalname));
    // }
    res.status(400).send(err);
  }
});
router.use("/category", category);
router.use("/user", user);
router.use("/board", board);
router.use("/reason", reason);
router.use("/cmt", cmt);
export default router;
