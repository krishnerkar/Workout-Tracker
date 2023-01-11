import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

type Data = {
  workoutId?: number;
  error?: string;
};

type Body = {
  hours: number;
  minutes: number;
  calories: number;
  avgHeartRate: number;
  date: string;
  notes: string;
  password: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body: Body = req.body;
  const password = body.password;
  const actualPassword = process.env.PASSWORD;

  console.log(password);
  console.log(actualPassword);
  console.log(password == actualPassword);

  if (password !== actualPassword) {
    res.status(403).json({ error: "Invalid password" });
    return;
  }

  const workout = await prisma.workout.create({
    data: {
      hours: body.hours,
      minutes: body.minutes,
      calories: body.calories,
      avgHeartRate: body.avgHeartRate,
      notes: body.notes,
      date: body.date,
    },
  });

  res.status(200).json({ workoutId: workout.id });
}
