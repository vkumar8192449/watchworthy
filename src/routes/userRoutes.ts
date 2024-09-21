// routes/userRoutes.ts

import { Router } from "express";
import {
  createUserController,
  loginUserController,
  logoutUserController,
} from "../controllers/userController";

const router = Router();

router.post("/create", createUserController);
router.post("/login", loginUserController);
router.get("/logout", logoutUserController);

export default router;
