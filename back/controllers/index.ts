import { Request, Response, Router } from "express";
import path from "path";
import session from "express-session";
import store from "session-file-store";
import { banCheck } from "../queries";

import category from "./category";
import user from "./user";
import board from "./board";

const FileStore = store(session);

declare module "express-session" {
  interface SessionData {
    userId: number;
    isAdminLogin: boolean;
    isMainAdmin: boolean;
  }
}

declare module "express" {
  interface Request {
    ban?: boolean;
  }
}

const router = Router();

router.use(
  session({
    resave: true,
    saveUninitialized: true,
    secret: "userInfo",
    name: "user",
    store: new FileStore({
      reapInterval: 1800,
      path: "./sessions",
    }),
    cookie: {
      signed: true,
      httpOnly: true,
      maxAge: 1800 * 1000,
    },
  })
);

router.use(async (req: Request, res: Response, next) => {
  req.ban = await banCheck(req.session.userId);
  req.ban && req.session.destroy((err) => console.log(err));
  next();
});
router.get("/img", (req, res) => {
  res.sendFile(path.join(__dirname, `../public/${req.query.name}`));
});
router.get("/testSession", (req, res) => {
  req.session.userId = 1;
  req.session.isAdminLogin = false;
  req.session.isMainAdmin = false;
  res.status(204).send();
});

router.use("/category", category);
router.use("/user", user);
router.use("/board", board);

export default router;
