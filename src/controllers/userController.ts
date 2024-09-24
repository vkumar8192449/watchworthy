// controllers/userController.ts

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import validator from "validator";
import { passwordStrength } from "check-password-strength";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { CookieOptions } from "express";
import { AuthenticatedRequest } from "../middleware/auth";

const prisma = new PrismaClient();

export const createUserController = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    if (
      !validator.isEmail(email) ||
      username.length < 6 ||
      !validator.isAlpha(username)
    ) {
      throw new Error("Invalid inputs");
    }

    if (passwordStrength(password).id < 2) {
      throw new Error("Enter strong password");
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prisma.user.create({
      data: { username, email, password: hashedPassword },
    });
    res.status(201).json({
      message: "Signup successful",
    });
  } catch (error: any) {
    res.status(400).json({ error: error.message || "User creation failed" });
  }
};

export const loginUserController = async (req: Request, res: Response) => {
  const { email, password } = req.body;

  try {
    // Check if the user exists in the database using Prisma
    const user = await prisma.user.findUnique({
      where: { email },
    });

    // If no user found, return an error
    if (!user) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Check if the password is correct
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // Generate a JWT token
    const token = jwt.sign(
      { userId: user.user_id, type: user.type, username: user.username },
      process.env.JWT_SECRET || "default_secret",
      {
        expiresIn: "3d",
      }
    );

    // Set JWT token in HttpOnly cookie
    // res;

    const options: CookieOptions = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      maxAge: 3 * 24 * 60 * 60 * 1000,
    };

    // Successful login
    res
      .status(200)
      .cookie("WatchWorthyToken", token, options)
      .json({
        message: "Login successful",
        user: { email: user.email, username: user.username },
      });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};

export const logoutUserController = async (req: Request, res: Response) => {
  res.clearCookie("WatchWorthyToken", {
    httpOnly: true,
    secure: true,
    sameSite: "none",
  });
  res.status(200).json({ message: "Logged out successfully!" });
};

export const currentUserController = async (
  req: AuthenticatedRequest,
  res: Response
) => {
  return res
    .status(200)
    .json({ user: req.user, message: "User authenticated." });
};
