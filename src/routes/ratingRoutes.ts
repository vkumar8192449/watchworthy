// routes/ratingRoutes.ts

import { Router } from "express";
import {
  createRatingController,
  getMovieRatingsController,
} from "../controllers/ratingController";

const router = Router();

router.post("/add-rating", createRatingController);
router.get("/get-all-rating/:id", getMovieRatingsController);

export default router;
