// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

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
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  // const body;

  res.status(200).json({ name: "John Doe" });
}
