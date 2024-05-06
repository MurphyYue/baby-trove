import prisma from "@/lib/prisma";
import dayjs from "dayjs";
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/auth";
import { NextResponse, NextRequest } from "next/server";

const secret = process.env.NEXTAUTH_SECRET;

export async function GET(req: NextRequest, res: NextResponse) {
  const page = req.nextUrl.searchParams.get('page');
  const pageSize = req.nextUrl.searchParams.get("pageSize");
  console.log(page, pageSize)
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return NextResponse.json({
        data: null,
        status: 401,
        message: "user session has expired",
      });
    }
    // 查询所有 published 为 true 的帖子
    const publishedPosts = await prisma.post.findMany({
      take: Number(pageSize) || 10,
      skip: (Number(page) - 1) * Number(pageSize),
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
    const total = await prisma.post.count();
    return NextResponse.json({
      data: postsWithMedia,
      status: 200,
      total: total
    });
  } catch (error) {
    console.error("Error retrieving published posts:", error);
    return NextResponse.json({ success: false, message: error, status: 500 });
  }
}