// controllers/ratingController.ts

import { Response } from "express";
import { PrismaClient } from "@prisma/client";
import { AuthenticatedRequest } from "../middleware/auth";

const prisma = new PrismaClient();

export const createRatingController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  const { movie_id, rating, review } = req.body;
  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated." });
  }
  const user_id = Number(req.user.userId);

  try {
    if (rating < 1 || rating > 5) {
      throw new Error("Invalid rating");
    }

    const newRating = await prisma.rating.create({
      data: { user_id, movie_id, rating, review },
    });
    res.json(newRating);
  } catch (error) {
    res.status(400).json({ error: error.message || "Rating creation failed" });
  }
};

export const getMovieRatingsController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated." });
  }

  const user_id = Number(req.user.userId);

  try {
    const ratings = await prisma.rating.findMany({
      where: { user_id: Number(user_id) }, // Ensure user_id is a number
      include: {
        movie: true, // Include related movie data if needed
      },
    });

    if (ratings.length === 0) {
      return res
        .status(404)
        .json({ message: "No ratings found for this user" });
    }

    return res.status(200).json(ratings);
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ error: "An error occurred while fetching ratings" });
  }
};
