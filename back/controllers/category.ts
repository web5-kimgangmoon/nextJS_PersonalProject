import { Request, Response, Router } from "express";
import { getCategory, getCategoryList } from "../queries/category";

const router = Router();

router.get("/list", async (req: Request, res: Response) => {
  res.send({ ...(await getCategoryList()) });
});

router.get("/:category", async (req: Request, res: Response) => {
  res.send({ ...(await getCategory(req.params.category)) });
});

export default router;
