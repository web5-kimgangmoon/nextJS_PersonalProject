import { Request, Response, Router } from "express";
import { getUserInfo, login, regist } from "../queries/user";
import {
  booleanCheck,
  intCheck,
  stringCheck,
  useTypeCheck_zod,
} from "../services/zod";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  const id = stringCheck.safeParse(req.body.id).success
    ? (req.body.id as string)
    : null;
  const pwd = stringCheck.safeParse(req.body.pwd)
    ? (req.body.pwd as string)
    : null;
  const isAdminLogin = req.query.isAdminLogin === "true" ? true : false;

  const user = await login(id, pwd, isAdminLogin);
  if (typeof user !== "string") {
    req.session.userId = user.id;
    req.session.isAdminLogin = isAdminLogin;
    req.session.isMainAdmin = user.authority === 2 ? true : false;
    res.status(204).send();
  } else res.status(400).send(user);
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
    res.status(400).send("잘못된 입력값을 입력하셨습니다.");
    return;
  }
  const result = await regist(
    nickCheck.parse(req.body.nick),
    emailCheck.parse(req.body.email),
    passwordCheck.parse(req.body.pwd)
  );
  if (typeof result !== "string") {
    res.status(204).send();
  } else res.status(400).send(result);
});

router.get("/", async (req: Request, res: Response) => {
  const userId = intCheck.safeParse(req.query.userId).success
    ? Number(req.query.userId)
    : undefined;
  if (userId) res.send({ userInfo: await getUserInfo(userId) });
  else
    req.session.userId
      ? res.send({ userInfo: await getUserInfo(req.session.userId) })
      : res.send({ userInfo: undefined });
});

export default router;
