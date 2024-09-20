// controllers/moviesController.ts

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createMoviesController = async (req: Request, res: Response) => {
  const { title, genre, release_year, description } = req.body;
  try {
    const movie = await prisma.movie.create({
      data: { title, genre, release_year, description },
    });
    res.json(movie);
  } catch (error) {
    res.status(400).json({ error: "Movie creation failed" });
  }
};
