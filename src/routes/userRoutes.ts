// routes/userRoutes.ts

import { Router } from "express";
import {
  createUserController,
  loginUserController,
  logoutUserController,
  currentUserController,
} from "../controllers/userController";
import auth from "../middleware/auth";

const router = Router();

router.post("/create", createUserController);
router.get("/current", auth, currentUserController);
router.post("/login", loginUserController);
router.get("/logout", logoutUserController);

export default router;
