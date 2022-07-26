import { PrismaClient } from "@prisma/client";
import { JwtPayload, verify } from "jsonwebtoken";
import type { UmiApiRequest, UmiApiResponse } from "umi";

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  switch (req.method) {
    case "GET": {
      const prisma = new PrismaClient();
      const allPosts = await prisma.post.findMany();
      const page = req.query.page ? +req.query.page : 1;
      const perPage = 6;
      res.status(200).json({
        posts: allPosts.slice((page - 1) * perPage, page * perPage),
        pagesTotal: Math.ceil(allPosts.length / 6),
      });
      await prisma.$disconnect();
      break;
    }
    case "POST": {
      if (!req.headers.authorization) {
        return res.status(401).json({ message: "Unauthorized" });
      }
      const author = verify(
        req.headers.authorization,
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
