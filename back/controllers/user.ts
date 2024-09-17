import { Request, Response, Router } from "express";
import {
  getUserInfo,
  login,
  profileUpdate,
  regist,
  withdraw,
} from "../queries/user";
import { intCheck, stringCheck, useTypeCheck_zod } from "../services/zod";
import { loginSearch } from "../services/loginSearch";
import { upload } from "../services/upload";

const router = Router();

router.post("/login", async (req: Request, res: Response) => {
  if (req.session.userId) {
    res.status(400).send("이미 로그인되어 있습니다!");
    return;
  }
  const id = stringCheck.safeParse(req.body.id).success
    ? (req.body.id as string)
    : null;
  const pwd = stringCheck.safeParse(req.body.pwd)
    ? (req.body.pwd as string)
    : null;
  const isAdminLogin = req.query.isAdminLogin === "true" ? true : false;
  const user = await login(id, pwd, isAdminLogin);
  if (typeof user !== "string") {
    const target = loginSearch(user.id);
    if (target.path.length > 0) {
      res.status(400).send("다른 유저가 로그인 중인 아이디입니다");
      return;
    }
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
      ? res
          .status(200)
          .send({ userInfo: await getUserInfo(req.session.userId) })
      : res.status(200).send({ userInfo: undefined });
});
router.patch("/", upload("img"), async (req: Request, res: Response) => {
  const userId = intCheck.safeParse(req.session.userId).success
    ? Number(req.session.userId)
    : undefined;
  const nick = stringCheck.safeParse(req.body.nick).success
    ? stringCheck.parse(req.body.nick)
    : null;
  const result = await profileUpdate(userId, nick, req.file?.filename);
  if (typeof result === "string") {
    res.status(400).send(result);
    return;
  }
  res.status(204).send();
});
router.delete("/", async (req: Request, res: Response) => {
  const userId = intCheck.safeParse(req.session.userId).success
    ? Number(req.session.userId)
    : undefined;
  const result = await withdraw(userId);

  if (typeof result !== "string") {
    req.session.destroy((err) => console.log(err));

    res.status(204).send();
    return;
  }
  res.status(400).send(result);
});

export default router;
