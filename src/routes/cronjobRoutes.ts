import { Router } from "express";
import { cronJobController } from "../controllers/cronJobController";

const router = Router();

router.get("/", cronJobController);

export default router;
