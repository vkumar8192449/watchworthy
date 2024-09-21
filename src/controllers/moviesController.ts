// controllers/moviesController.ts

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import validator from "validator";

const prisma = new PrismaClient();

export const createMoviesController = async (req: Request, res: Response) => {
  const { title, genre, release_year, description } = req.body;
  try {
    if (!validator.isNumeric(release_year.toString())) {
      throw new Error("Invalid release year");
    }

    const movie = await prisma.movie.create({
      data: { title, genre, release_year, description },
    });
    res.json(movie);
  } catch (error: any) {
    res.status(400).json({ error: error.message || "Movie creation failed" });
  }
};
