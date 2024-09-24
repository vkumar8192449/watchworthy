"use client";

import {
  createContext,
  useState,
  useEffect,
  ReactNode,
  useContext,
} from "react";
import axios from "axios";

interface User {
  userId: number;
  username: string;
  type: string;
  // Add other fields based on your user schema
}

interface UserContextProps {
  user: User | null;
  logout: () => void;
}

// Create the UserContext
const UserContext = createContext<UserContextProps | undefined>(undefined);

// Create a provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Function to fetch the current logged-in user
  const fetchUser = async () => {
    try {
      const response = await axios.get<User>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/current`,
        {
          withCredentials: true, // Ensure cookies are sent with requests
        }
      );
      setUser(response.data);
    } catch (err) {
      console.error("Error fetching user details:", err);
      setUser(null); // Reset user state if error occurs
    }
  };

  useEffect(() => {
    fetchUser(); // Fetch user details when the app loads
  }, []);

  const logout = () => {
    // Call logout API and clear user state
    axios
      .get(`${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/logout`, {
        withCredentials: true,
      })
      .then(() => setUser(null))
      .catch((err) => console.error("Logout failed", err));
  };

  return (
    <UserContext.Provider value={{ user, logout }}>
      {children}
    </UserContext.Provider>
  );
};

// Create a custom hook to use the UserContext
export const useUser = () => {
  const context = useContext(UserContext);
  if (!context) {
    throw new Error("useUser must be used within a UserProvider");
  }
  return context;
};
