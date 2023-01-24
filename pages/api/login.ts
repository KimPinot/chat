import { sign } from "jsonwebtoken";
import { NextApiRequest, NextApiResponse } from "next";

import { database } from "utils/prisma";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const user = await database.user.findFirst({
      where: {
        email: req.body.email,
        password: req.body.password,
      },
    });
    if (!user) return res.status(404).end("User not found");
    const token = sign(user, process.env.JWT_SECRET as string);
    res.status(200).json({ user, token });
  } else {
    res.status(405).end("Method not allowed");
  }
}
