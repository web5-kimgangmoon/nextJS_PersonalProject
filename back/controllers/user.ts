import { Request, Response, Router } from "express";
import { getUserInfo, login, regist } from "../queries/user";
import { booleanCheck, useTypeCheck_zod } from "../services/zod";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  const id = req.body.id ? (req.body.id as string) : null;
  const pwd = req.body.pwd ? (req.body.pwd as string) : null;
  const isAdminLogin = booleanCheck.safeParse(req.query.isAdminLogin).success
    ? req.query.isAdminLogin === "true"
      ? true
      : false
    : false;
  const user = await login(id, pwd, isAdminLogin);
  if (user) {
    req.session.userId = user.id;
    req.session.isAdminLogin = isAdminLogin;
    req.session.isMainAdmin = user.authority === 2 ? true : false;
    res.status(204).send();
  } else res.status(400).send();
});

router.post("/logout", async (req: Request, res: Response) => {
  if (req.session.userId) {
    req.session.destroy((err) => console.log(err));
    res.status(204).send();
  } else res.status(400).send();
});

router.post("/regist", async (req: Request, res: Response) => {
  const { nickCheck, passwordCheck, emailCheck } = useTypeCheck_zod();
  if (
    !nickCheck.safeParse(req.body.nick).success ||
    !passwordCheck.safeParse(req.body.pwd) ||
    !emailCheck.safeParse(req.body.email)
  ) {
    res.status(400).send();
    return;
  }
  (await regist(
    nickCheck.parse(req.body.nick),
    emailCheck.parse(req.body.email),
    passwordCheck.parse(req.body.pwd)
  ))
    ? res.status(204).send()
    : res.status(400).send();
});

router.get("/", async (req: Request, res: Response) => {
  req.session.userId
    ? res.send({ userInfo: await getUserInfo(req.session.userId) })
    : res.send({ userInfo: undefined });
});

export default router;
