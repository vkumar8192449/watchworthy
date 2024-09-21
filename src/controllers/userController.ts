// controllers/userController.ts

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import validator from "validator";
import { passwordStrength } from "check-password-strength";

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

    const user = await prisma.user.create({
      data: { username, email, password },
    });
    res.json(user);
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

    // Compare the provided password with the stored password
    if (user.password !== password) {
      return res.status(400).json({ message: "Invalid email or password" });
    }

    // Successful login
    res.status(200).json({
      message: "Login successful",
      user: { email: user.email, username: user.username },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error" });
  }
};
