"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { notFound } from "next/navigation";
import RatingForm from "../../../components/RatingForm"; // Adjust the import based on your file structure
import Header from "../../../components/Header"; // Adjust the import based on your file structure

interface MovieDetail {
  movie_id: number;
  title: string;
  release_year: number;
  genre: string;
  description: string;
  ratings: Array<{
    user: { username: string };
    rating: number;
    review: string;
  }>;
}

const MovieDetail = ({ params }: { params: { movie_id: string } }) => {
  return <h1>{params.movie_id}</h1>;
  // const [movie, setMovie] = useState<MovieDetail | null>(null);
  // const [loading, setLoading] = useState(true);
  // const [error, setError] = useState<string | null>(null);

  // const fetchMovieDetails = async () => {
  //   try {
  //     console.log("Hy2- " + params.movie_id);
  //     const response = await axios.get<MovieDetail>(
  //       `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/movies/${params.movie_id}`
  //     );
  //     setMovie(response.data);
  //   } catch (err) {
  //     setError("Failed to load movie details.");
  //     console.error(err);
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   console.log("Hy1- " + params.movie_id);
  //   fetchMovieDetails();
  //   console.log("Hy3- " + params.movie_id);
  // }, [params.movie_id]);

  // const handleRatingSubmitted = () => {
  //   fetchMovieDetails(); // Refresh movie details to include new rating
  // };

  // if (loading) return <div>Loading...</div>;
  // if (error) return <div>{error}</div>;
  // if (!movie) return notFound(); // Handle case where movie is not found

  // return (
  //   <>
  //     <Header />
  //     <div className="min-h-screen flex flex-col items-center bg-gray-100 py-8">
  //       <div className="bg-white shadow-lg rounded-lg p-6 max-w-3xl w-full">
  //         <h1 className="text-3xl font-bold text-gray-800 mb-4">
  //           {movie.title}
  //         </h1>
  //         <p className="text-gray-600 mb-2">
  //           Release Year: {movie.release_year}
  //         </p>
  //         <p className="text-gray-700 mb-2">Genre: {movie.genre}</p>
  //         <p className="text-gray-800 mb-4">{movie.description}</p>
  //         <h2 className="text-2xl font-semibold mb-2">Ratings:</h2>
  //         <ul>
  //           {movie.ratings.map((rating, index) => (
  //             <li key={index} className="mb-1">
  //               {rating.user.username}: {rating.rating} ⭐ - {rating.review}
  //             </li>
  //           ))}
  //         </ul>
  //         <br />
  //         <RatingForm
  //           movieId={movie.movie_id}
  //           onRatingSubmitted={handleRatingSubmitted}
  //         />
  //       </div>
  //     </div>
  //   </>
  // );
};

export default MovieDetail;
