import prisma from "@/lib/prisma";
import dayjs from "dayjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse, NextRequest } from "next/server";

export async function GET(req: NextRequest, res: NextResponse) {
  const page = req.nextUrl.searchParams.get('page');
  const pageSize = req.nextUrl.searchParams.get("pageSize");
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({
        data: null,
        status: 401,
        message: "user session has expired",
      });
    }
    const offset = (Number(page) - 1) * Number(pageSize);
    // 查询所有 published 为 true 的帖子
    const publishedPosts = await prisma.post.findMany({
      take: Number(pageSize) || 10,
      skip: offset,
      where: {
        published: true,
        author: {
          email: session?.user.email || "",
        },
      },
      // 同时加载每个帖子的关联媒体
      include: {
        medias: true,
      },
    });

    // 对于每个帖子，获取其中的媒体地址
    const postsWithMedia = publishedPosts.map((post) => {
      const mediaUrls = post.medias.map((media) => media.url);
      return {
        id: post.id,
        title: post.title || "",
        content: post.content || "",
        updateTime: dayjs(post.updatedAt.toISOString()).format("YYYY-MM-DD hh:mm:ss"),
        mediaUrls: mediaUrls,
      };
    });
    const total = await prisma.post.count({
      where: {
        published: true,
        author: {
          email: session?.user.email || "",
        },
      },
    });
    return NextResponse.json({
      data: postsWithMedia,
      status: 200,
      total: total
    });
  } catch (error) {
    console.log("Error retrieving published posts:", error);
    return NextResponse.json({ success: false, message: "Error retrieving published posts", status: 500 })
  }
}