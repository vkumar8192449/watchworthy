import { Request, Response } from "express";

export const cronJobController = async (req: Request, res: Response) => {
  res.status(200).json({ message: "Cron job executed successfully" });
};
