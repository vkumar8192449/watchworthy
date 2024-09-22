// routes/moviesRoutes.ts

import { Router } from "express";
import {
  createMoviesController,
  getAllMoviesController,
  //   getMovieDetailsController,
} from "../controllers/moviesController";
import auth from "../middleware/auth";

const router = Router();

router.post("/add-movieshow", auth, createMoviesController);
router.post("/", getAllMoviesController);
// router.get("/:movie_id", getMovieDetailsController);

export default router;
