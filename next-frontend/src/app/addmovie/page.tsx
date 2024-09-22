// src/components/AddMovie.tsx

"use client";

import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

const AddMovie = () => {
  const [title, setTitle] = useState("");
  const [genre, setGenre] = useState("");
  const [releaseYear, setReleaseYear] = useState<number | "">("");
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const response = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/movies/add-movieshow`,
        {
          title,
          genre,
          release_year: releaseYear,
          description,
        },
        {
          // Additional configuration, including withCredentials
          withCredentials: true,
        }
      );

      // Clear form on success
      setTitle("");
      setGenre("");
      setReleaseYear("");
      setDescription("");
      setSuccess("Movie/show added successfully!");

      // Optionally redirect after successful creation
      //   router.push("/"); // Redirect to homepage or list of movies/shows
    } catch (err: any) {
      if (err.response && err.response.data) {
        setError(err.response.data.message || "An error occurred");
      } else {
        setError("An error occurred");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-lg">
        <h2 className="text-2xl font-semibold mb-4">Add Movie/Show</h2>

        {error && <p className="text-red-500 mb-4">{error}</p>}
        {success && <p className="text-green-500 mb-4">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Title:
            </label>
            <input
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="genre"
              className="block text-sm font-medium text-gray-700"
            >
              Genre:
            </label>
            <input
              type="text"
              id="genre"
              value={genre}
              onChange={(e) => setGenre(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="releaseYear"
              className="block text-sm font-medium text-gray-700"
            >
              Release Year:
            </label>
            <input
              type="number"
              id="releaseYear"
              value={releaseYear}
              onChange={(e) => setReleaseYear(parseInt(e.target.value))}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description:
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              className="mt-1 block w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring focus:ring-blue-300"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-500 transition duration-200"
          >
            Add Movie/Show
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddMovie;
