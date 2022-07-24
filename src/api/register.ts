import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";
import { sign } from "jsonwebtoken";
import type { UmiApiRequest, UmiApiResponse } from "umi";

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  try {
    const prisma = new PrismaClient();
    const user = await prisma.user.create({
      data: {
        email: req.body.email,
        passwordHash: bcrypt.hashSync(req.body.password, 8),
        name: req.body.name,
        avatarUrl: req.body.avatarUrl,
      },
    });

    res
      .status(201)
      .setCookie("token", sign({ id: user.id }, process.env.SECRET_KEY!))
      .json({ ...user, passwordHash: undefined });

    await prisma.$disconnect();
  } catch (e: any) {
    console.error(e);
    res.status(500).json({
      result: false,
      message:
        typeof e.code === "string"
          ? "https://www.prisma.io/docs/reference/api-reference/error-reference#" +
            e.code.toLowerCase()
          : e,
    });
  }
}
