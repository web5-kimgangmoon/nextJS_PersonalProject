import { Request, Response, Router } from "express";
import { getCategory, getCategoryRules } from "../queries/category";
import { stringCheck } from "../services/zod";

const router = Router();

router.get("/:category", async (req: Request, res: Response) => {
  res.send({ ...(await getCategory(req.params.category)) });
});
router.get("/:category/rule", async (req: Request, res: Response) => {
  const category = stringCheck.safeParse(req.params.category).success
    ? stringCheck.parse(req.params.category)
    : null;
  const rules = await getCategoryRules(category);
  rules ? res.status(200).send(rules) : res.status(404).send({ rules: [] });
});

export default router;
