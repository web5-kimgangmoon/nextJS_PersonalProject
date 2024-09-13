import { Request, Response, Router } from "express";
import { getUserInfo, login } from "../queries/user";
import { booleanCheck } from "../services/zod";

const router = Router();

router.get("/", async (req: Request, res: Response) => {
  req.session.userId
    ? res.send({ userInfo: await getUserInfo(req.session.userId) })
    : res.send({ userInfo: undefined });
});

router.post("/login", async (req: Request, res: Response) => {
  const id = req.query.id ? (req.query.id as string) : null;
  const pwd = req.query.pwd ? (req.query.pwd as string) : null;
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

export default router;
