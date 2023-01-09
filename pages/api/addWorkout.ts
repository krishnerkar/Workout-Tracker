import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { Exercise } from "@prisma/client";

type Data = {
  name: string;
};

type Body = {
  hours: number;
  minutes: number;
  calories: number;
  date: String;
  avgHeartRate: number;
  notes?: string;
  exercises: Exercise[]; //{name: string}

};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const body;

  res.status(200).json({ name: "John Doe" });
}
