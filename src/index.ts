import express from "express";
import userRoutes from "./routes/userRoutes";
import movieRoutes from "./routes/moviesRoutes";
import ratingRoutes from "./routes/ratingRoutes";

const app = express();

app.use(express.json());

// Register the user routes
app.use("/api/users", userRoutes);

// Create a movie
app.use("/api/movies", movieRoutes);

// Create or Get a rating/s
app.use("/api/rating", ratingRoutes);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
