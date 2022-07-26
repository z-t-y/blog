import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import type { UmiApiRequest, UmiApiResponse } from "umi";

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  if (req.method === "POST") {
    const prisma = new PrismaClient();
    const user = await prisma.user.findUnique({
      where: {
        email: req.body.email,
      },
    });
    if (user === null) {
      res.status(404).json({ message: "User not found" });
    } else if (user.email !== process.env.ADMIN_EMAIL) {
      res.status(401).json({ message: "You cannot login!" });
    } else if (!bcrypt.compareSync(req.body.password, user.passwordHash)) {
      res.status(401).json({ message: "Authorization failed" });
    } else {
      res.status(200).json({
        token: sign({ id: user.id }, process.env.SECRET_KEY!),
      });
    }
    await prisma.$disconnect();
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
