// routes/userRoutes.ts

import { Router } from "express";
import {
  createUserController,
  loginUserController,
} from "../controllers/userController";

const router = Router();

router.post("/create", createUserController);
router.post("/login", loginUserController);

export default router;
