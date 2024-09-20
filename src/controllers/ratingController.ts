// controllers/ratingController.ts

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createRatingController = async (req: Request, res: Response) => {
  const { user_id, movie_id, rating, review } = req.body;

  try {
    const newRating = await prisma.rating.create({
      data: { user_id, movie_id, rating, review },
    });
    res.json(newRating);
  } catch (error) {
    res.status(400).json({ error: "Rating creation failed" });
  }
};

export const getMovieRatingsController = async (
  req: Request,
  res: Response
) => {
  const { id } = req.params;

  try {
    const ratings = await prisma.rating.findMany({
      where: { movie_id: Number(id) },
      include: { user: true },
    });
    res.json(ratings);
  } catch (error) {
    res.status(400).json({ error: "Failed to retrieve ratings" });
  }
};
