import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

type Data = {
  exerciseId: number;
};

type Set = {
  reps: number;
  weight: number;
};

type Body = {
  workoutId: number;
  typeId: number;
  sets: Set[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body: Body = req.body;

  const exercise = await prisma.exercise.create({
    data: {
      workoutId: body.workoutId,
      typeId: body.typeId,
    },
  });

  const sets = body.sets.map((set) => {
    return {
      reps: set.reps,
      weight: set.weight,
      exerciseId: exercise.id,
    };
  });

  const setsResult = await prisma.set.createMany({
    data: sets,
  });

  res.status(200).json({ exerciseId: exercise.id });
}
