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
}

interface UserProp {
  user: User;
  message: string;
}

interface UserContextProps {
  user: UserProp | null;
  loading: boolean; // Add loading state
  fetchUser: () => void;
  logout: () => void;
}

// Create the UserContext
const UserContext = createContext<UserContextProps | undefined>(undefined);

// Create a provider component
export const UserProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<UserProp | null>(null);
  const [loading, setLoading] = useState(true); // Initialize loading state

  // Function to fetch the current logged-in user
  const fetchUser = async () => {
    setLoading(true); // Set loading to true before the fetch
    try {
      const response = await axios.get<UserProp>(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/current`,
        {
          withCredentials: true, // Ensure cookies are sent with requests
        }
      );
      setUser(response.data); // Update user state with fetched data
    } catch (err) {
      console.error("Error fetching user details:", err);
      setUser(null); // Reset user state if error occurs
    } finally {
      setLoading(false); // Set loading to false after fetch completes
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
    <UserContext.Provider value={{ user, loading, fetchUser, logout }}>
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
