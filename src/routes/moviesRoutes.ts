// routes/moviesRoutes.ts

import { Router } from "express";
import { createMoviesController } from "../controllers/moviesController";

const router = Router();

router.post("/add-movieshow", createMoviesController);

export default router;
