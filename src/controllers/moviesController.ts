// controllers/moviesController.ts

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import validator from "validator";
import { AuthenticatedRequest } from "../middleware/auth";

const prisma = new PrismaClient();

export const createMoviesController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  if (!req.user) {
    return res.status(401).json({ message: "User not authenticated." });
  }

  if (req.user.type === "user") {
    return res.status(401).json({ message: "Access denied." });
  }

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
