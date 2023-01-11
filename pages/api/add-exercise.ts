import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";

type Data = {
  exerciseId?: number;
  error?: string;
};

type Set = {
  reps: number;
  weight: number;
};

type Body = {
  workoutId: number;
  typeId: number;
  sets: Set[];
  password: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const body: Body = req.body;

  const password = body.password;
  const actualPassword = process.env.PASSWORD;

  console.log(password)
  console.log(actualPassword)
  console.log(password == actualPassword)

  if (password !== actualPassword) {
    res.status(403).json({ error: "Invalid password" });
    return;
  }

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
