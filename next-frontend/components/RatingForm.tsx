"use client";

import { useState } from "react";
import axios from "axios";

interface RatingFormProps {
  movieId: number;
  onRatingSubmitted: () => void; // Callback to refresh ratings
}

const RatingForm: React.FC<RatingFormProps> = ({
  movieId,
  onRatingSubmitted,
}) => {
  const [newRating, setNewRating] = useState<number>(0);
  const [newReview, setNewReview] = useState<string>("");

  const handleRatingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/rating/add-rating`,
        {
          movie_id: movieId,
          rating: newRating,
          review: newReview,
        },
        {
          withCredentials: true, // Ensure cookies are sent with requests
        }
      );
      // Reset inputs
      setNewRating(0);
      setNewReview("");
      onRatingSubmitted(); // Call the callback to refresh ratings
    } catch (error) {
      console.error("Failed to submit rating", error);
    }
  };

  return (
    <form onSubmit={handleRatingSubmit} className="mt-4">
      <h2 className="text-xl font-bold mb-2">Submit Your Rating</h2>
      <div className="flex flex-col mb-4">
        <label className="text-gray-700">Rating (1-5):</label>
        <input
          type="number"
          min="1"
          max="5"
          value={newRating}
          onChange={(e) => setNewRating(Number(e.target.value))}
          className="border border-gray-300 rounded-lg p-2"
          required
        />
      </div>
      <div className="flex flex-col mb-4">
        <label className="text-gray-700">Review:</label>
        <textarea
          value={newReview}
          onChange={(e) => setNewReview(e.target.value)}
          className="border border-gray-300 rounded-lg p-2"
          rows={4}
          required
        />
      </div>
      <button
        type="submit"
        className="px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700 transition-colors duration-300"
      >
        Submit Rating
      </button>
    </form>
  );
};

export default RatingForm;
