"use client";

import axios from "axios";
import { useState, useEffect } from "react";
import Link from "next/link"; // Import Link from Next.js

// Define the types for movie and response data
interface Movie {
  movie_id: number;
  title: string;
  release_year: number;
  genre: string;
}

interface MoviesResponse {
  movies: Movie[];
  hasMore: boolean;
}

const MoviesComponent = () => {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [page, setPage] = useState<number>(1);
  const [hasMore, setHasMore] = useState<boolean>(true); // Track if more movies are available

  useEffect(() => {
    fetchMovies();
  }, [page]);

  const fetchMovies = async () => {
    try {
      const response = await axios.post<MoviesResponse>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/movies`,
        {
          page,
        }
      );

      setMovies((prevMovies) => {
        const newMovies = response.data.movies;

        // Combine previous and new movies and filter duplicates
        const allMovies = [...prevMovies, ...newMovies];

        // Filter duplicates based on movie_id
        const uniqueMovies = Array.from(
          new Set(allMovies.map((movie) => movie.movie_id))
        )
          .map((id) => allMovies.find((movie) => movie.movie_id === id))
          .filter((movie): movie is Movie => movie !== undefined); // Type guard

        return uniqueMovies;
      });

      setHasMore(response.data.hasMore);
    } catch (error) {
      console.error("Failed to load movies", error);
    }
  };

  const loadMoreMovies = () => {
    if (hasMore) {
      setPage((prevPage) => prevPage + 1); // Increment page number to load the next set of movies
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-8">
      <h1 className="text-4xl font-bold text-gray-800 mb-8">Movies</h1>
      <br />
      <div className="w-full max-w-4xl flex flex-wrap justify-center gap-8">
        {movies.map((movie) => (
          <div
            key={movie.movie_id}
            className="bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105 w-full sm:w-1/2 md:w-1/3 lg:w-1/4 cursor-pointer"
          >
            <Link href={`/movie-show/${movie.movie_id}`}>
              <div className="p-6 flex flex-col items-center">
                <h2 className="text-xl font-semibold text-gray-900 mb-2">
                  {movie.title}
                </h2>
                <p className="text-gray-600 mb-1">({movie.release_year})</p>
                <p className="text-gray-700 mt-2 font-medium">
                  Genre: {movie.genre}
                </p>
              </div>
            </Link>
          </div>
        ))}
      </div>
      <br />
      {hasMore && (
        <button
          onClick={loadMoreMovies}
          style={{ padding: "0.8rem 1.8rem" }} // Apply padding inline
          className="mt-10 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
        >
          Load More
        </button>
      )}
    </div>
  );
};

export default MoviesComponent;
