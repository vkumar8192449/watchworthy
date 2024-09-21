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
