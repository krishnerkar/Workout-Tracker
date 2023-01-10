import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

type Data = {
  workoutId: number;
};

type Body = {
  hours: number;
  minutes: number;
  calories: number;
  avgHeartRate: number;
  date: string;
  notes: string;
  
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body: Body = req.body;

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
