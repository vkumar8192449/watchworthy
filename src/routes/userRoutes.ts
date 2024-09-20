// routes/userRoutes.ts

import { Router } from "express";
import { createUserController } from "../controllers/userController";

const router = Router();

router.post("/create", createUserController);

export default router;
