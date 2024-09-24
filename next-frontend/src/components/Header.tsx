// components/Header.tsx
"use client";

import Link from "next/link";
import { useUser } from "../../context/UserContext";
import { useState } from "react";

const Header = () => {
  const { user } = useUser();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const handleLogout = () => {
    setDropdownOpen(false); // Close dropdown after logout
  };

  return (
    <header className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Left side - Logo */}
        <div className="text-3xl font-bold">
          <Link href="/">
            <span className="hover:text-gray-300 transition duration-300 ease-in-out">
              WatchWorthy
            </span>
          </Link>
        </div>

        {/* Right side - Authentication buttons or profile */}
        <div className="flex items-center space-x-6">
          {!user ? (
            // Show Sign In and Sign Up buttons if user is not authenticated
            <>
              <Link href="/signin">
                <button className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100 transform transition hover:scale-105 duration-300 ease-in-out">
                  Sign In
                </button>
              </Link>
              <Link href="/signup">
                <button className="bg-white text-blue-600 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100 transform transition hover:scale-105 duration-300 ease-in-out">
                  Sign Up
                </button>
              </Link>
            </>
          ) : (
            // Show Profile dropdown if user is authenticated
            <div className="relative">
              <button
                onClick={() => setDropdownOpen(!dropdownOpen)}
                className="flex items-center space-x-2 bg-white text-blue-600 px-4 py-2 rounded-lg shadow-sm hover:bg-gray-100 transform transition hover:scale-105 duration-300 ease-in-out"
              >
                <span>👤</span>
                <span className="font-medium">{user.username}</span>
              </button>
              {dropdownOpen && (
                <div className="absolute right-0 mt-2 bg-white text-blue-600 shadow-lg rounded-lg py-2 w-48 z-10 transition-all duration-300 ease-in-out">
                  <Link href="/all-ratings">
                    <span className="block px-4 py-2 hover:bg-gray-100 cursor-pointer transition">
                      My Dash
                    </span>
                  </Link>
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 hover:bg-gray-100 cursor-pointer transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
