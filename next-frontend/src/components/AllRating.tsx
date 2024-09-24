"use client";

import { useEffect, useState } from "react";
import axios from "axios";

interface Movie {
  movie_id: number;
  title: string;
  genre: string;
  release_year: number;
  description: string;
}

interface Rating {
  rating_id: number;
  user_id: number;
  movie_id: number;
  rating: number;
  review: string;
  date_rated: string;
  movie: Movie;
}

const AllRatings = () => {
  const [ratings, setRatings] = useState<Rating[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchRatings = async () => {
      try {
        const response = await axios.get<Rating[]>(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/rating/get-all-rating`,
          {
            withCredentials: true, // Ensure cookies are sent with requests
          }
        );
        setRatings(response.data);
      } catch (err) {
        setError("Failed to load user ratings.");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchRatings();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="min-h-screen flex flex-col items-center bg-gray-100 py-8">
      <h1 className="text-3xl font-bold text-gray-800 mb-4">All Ratings</h1>
      <ul className="w-full max-w-4xl">
        {ratings.map((rating) => (
          <li
            key={rating.rating_id}
            className="bg-white shadow-lg rounded-lg p-4 mb-4"
          >
            <h2 className="text-xl font-semibold text-gray-800">
              {rating.movie.title} ({rating.movie.release_year})
            </h2>
            <p className="text-gray-600">Genre: {rating.movie.genre}</p>
            <p className="text-gray-700 mt-2">Rating: {rating.rating} ⭐</p>
            <p className="text-gray-800">Review: {rating.review}</p>
            <p className="text-gray-500 text-sm">
              Rated on: {new Date(rating.date_rated).toLocaleDateString()}
            </p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default AllRatings;
