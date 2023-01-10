import type { NextApiRequest, NextApiResponse } from "next";
import prisma from "@/lib/prisma";
import { Type } from "@prisma/client";

type Data = {
  types: Type[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const types = await prisma.type.findMany();
  
  res.status(200).json({ types: types });
}
