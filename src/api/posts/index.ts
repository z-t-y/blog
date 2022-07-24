import { PrismaClient } from "@prisma/client";
import { JwtPayload, verify } from "jsonwebtoken";
import type { UmiApiRequest, UmiApiResponse } from "umi";

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  switch (req.method) {
    case "GET": {
      const prisma = new PrismaClient();
      const allPosts = prisma.post.findMany();
      res.status(200).json(allPosts);
      await prisma.$disconnect();
      break;
    }
    case "POST": {
      if (!req.cookies?.token) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const author = verify(
        req.cookies.token,
        process.env.SECRET_KEY!
      ) as JwtPayload;
      const authorId = author.id;
      const prisma = new PrismaClient();
      const post = await prisma.post.create({
        data: {
          title: req.body.title,
          content: req.body.content,
          createdAt: new Date(),
          authorId,
          tags: req.body.tags.join(","),
          imageUrl: req.body.imageUrl,
        },
      });
      res.status(200).json(post);
      await prisma.$disconnect();
      break;
    }
    default: {
      res.status(405).json({ result: false, message: "Method not allowed" });
    }
  }
}
