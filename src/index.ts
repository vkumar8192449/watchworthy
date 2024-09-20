import express from "express";
import { PrismaClient } from "@prisma/client";

const app = express();
const prisma = new PrismaClient();

app.use(express.json());

// Create a new user
app.post("/users", async (req, res) => {
  const { username, email, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: { username, email, password },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "User creation failed" });
  }
});

// Create a movie
app.post("/movies", async (req, res) => {
  const { title, genre, release_year, description } = req.body;
  try {
    const movie = await prisma.movie.create({
      data: { title, genre, release_year, description },
    });
    res.json(movie);
  } catch (error) {
    res.status(400).json({ error: "Movie creation failed" });
  }
});

// Create a rating
app.post("/ratings", async (req, res) => {
  const { user_id, movie_id, rating, review } = req.body;
  try {
    const newRating = await prisma.rating.create({
      data: { user_id, movie_id, rating, review },
    });
    res.json(newRating);
  } catch (error) {
    res.status(400).json({ error: "Rating creation failed" });
  }
});

// Get movie ratings
app.get("/movies/:id/ratings", async (req, res) => {
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
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
