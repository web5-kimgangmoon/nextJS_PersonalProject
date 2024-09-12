import { Router } from "express";
import path from "path";

const router = Router();

router.get("/img", (req, res) => {
  res.sendFile(path.join(__dirname, `../public/${req.query.name}`));
});

export default router;
