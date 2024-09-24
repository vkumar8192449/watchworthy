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
  } catch (error) {
    res.status(400).json({ error: error.message || "Movie creation failed" });
  }
};

export const getAllMoviesController = async (req: Request, res: Response) => {
  const { page = 1, limit = 4 } = req.body; // Extract page and limit from the request body

  try {
    const movies = await prisma.movie.findMany({
      skip: (page - 1) * limit, // Skip movies based on the page number
      take: limit, // Limit to the number of movies requested
      orderBy: {
        release_year: "desc", // Sort by release_year in descending order
      },
    });

    // Get the total number of movies (optional, for frontend pagination logic)
    const totalMovies = await prisma.movie.count();

    res.status(200).json({
      movies,
      totalMovies,
      hasMore: page * limit < totalMovies, // Whether there are more movies to load
    });
  } catch (error) {
    res.status(500).json({ error: "Failed to retrieve movies." });
  }
};

export const getMovieDetailsController = async (
  req: Request,
  res: Response
) => {
  const { movie_id } = req.params; // Assuming movie_id is passed as a URL parameter

  try {
    // Fetch movie details along with ratings
    const movie = await prisma.movie.findUnique({
      where: { movie_id: Number(movie_id) },
      include: {
        ratings: {
          select: {
            rating: true,
            review: true,
            user: { select: { username: true } }, // Adjust based on your user model
          },
        },
      },
    });

    if (!movie) {
      return res.status(404).json({ message: "Movie not found" });
    }

    res.json(movie);
  } catch (error) {
    res.status(500).json({
      error: error.message || "An error occurred while fetching movie details",
    });
  }
};
