import { Request, Response, Router } from "express";
import { getCategory } from "../queries/category";

const router = Router();

router.get("/:category", async (req: Request, res: Response) => {
  res.send({ ...(await getCategory(req.params.category)) });
});

export default router;
