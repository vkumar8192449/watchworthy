import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express"; // Import types from express

// Define an interface for the JWT payload (you can customize it based on your actual payload)
interface JwtPayload {
  userId: string;
  username: string;
  type?: string;
}

// Extend the Request interface to include a 'user' property
export interface AuthenticatedRequest extends Request {
  user?: JwtPayload; // or any other type based on your payload structure
}

// Middleware to verify JWT token from cookies
const auth = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
  const token = req.cookies.WatchWorthyToken; // Extract token from cookies

  if (!token) {
    return res
      .status(401)
      .json({ message: "Access denied. No token provided." });
  }

  try {
    // Verify the token
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string
    ) as JwtPayload;

    // Attach decoded user info to the request
    req.user = decoded;

    // Pass control to the next middleware or route handler
    next();
  } catch (err) {
    return res.status(400).json({ message: "Invalid token." });
  }
};

export default auth;
