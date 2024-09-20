// controllers/userController.ts

import { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const createUserController = async (req: Request, res: Response) => {
  const { username, email, password } = req.body;
  try {
    const user = await prisma.user.create({
      data: { username, email, password },
    });
    res.json(user);
  } catch (error) {
    res.status(400).json({ error: "User creation failed" });
  }
};
