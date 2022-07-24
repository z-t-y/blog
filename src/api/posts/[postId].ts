import { PrismaClient } from "@prisma/client";
import type { UmiApiRequest, UmiApiResponse } from "umi";

export default async function (req: UmiApiRequest, res: UmiApiResponse) {
  if (req.method !== "GET") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }
  const prisma = new PrismaClient();
  const post = await prisma.post.findUnique({
    where: { id: +req.params.postId },
    include: { author: true },
  });
  if (post) {
    res.status(200).json(post);
  } else {
    res.status(404).json({ error: "Post not found" });
  }
  await prisma.$disconnect();
}
