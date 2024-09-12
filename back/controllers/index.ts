import { Router } from "express";
import path from "path";
import session from "express-session";
import store from "session-file-store";

const FileStore = store(session);

declare module "express-session" {
  interface SessionData {
    userId: number;
    isAdminLogin: boolean;
    isMainAdmin: boolean;
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
router.get("/sessionTest", (req, res) => {
  req.session.userId = 1;
  req.session.isAdminLogin = false;
  req.session.isMainAdmin = false;
  res.status(204).send();
});

router.get("/sessionCheck", (req, res) => {
  res.status(200).send(req.session);
});
router.get("/img", (req, res) => {
  res.sendFile(path.join(__dirname, `../public/${req.query.name}`));
});

export default router;
