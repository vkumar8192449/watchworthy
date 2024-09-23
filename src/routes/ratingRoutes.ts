// routes/ratingRoutes.ts

import { Router } from "express";
import {
  createRatingController,
  getMovieRatingsController,
} from "../controllers/ratingController";
import auth from "../middleware/auth";

const router = Router();

router.post("/add-rating", auth, createRatingController);
router.get("/get-all-rating", auth, getMovieRatingsController);

export default router;
