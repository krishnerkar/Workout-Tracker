import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { Type } from "@prisma/client";

type Data = {
  workouts: SimpleWorkout[];
};

export type SimpleWorkout = {
  date: string;
  hours: number;
  minutes: number;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const workouts = await prisma.workout.findMany({
    select: {
      date: true,
      hours: true,
      minutes: true,
    },
  });
  res.status(200).json({ workouts: workouts });
}
