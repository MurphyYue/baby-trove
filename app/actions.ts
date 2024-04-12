import prisma from "@/lib/prisma";
import { Post } from "@/components/Timeline";
import dayjs from "dayjs";
import { getServerSession } from "next-auth/next";
import { OPTIONS } from '@/app/api/auth/[...nextauth]/option'
import { redirect } from "next/navigation";

export async function getPublishedPostsAndMedia(): Promise<Post[]> {
  try {
    const session = await getServerSession(OPTIONS);
    if (!session?.user?.email) {
      redirect("/user");
    }
    // 查询所有 published 为 true 的帖子
    const publishedPosts = await prisma.post.findMany({
      where: {
        published: true,
        author: {
          email: session.user.email,
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
        title: post.title || '',
        content: post.content || '',
        updateTime: dayjs(post.updatedAt.toISOString()).format("YYYY-MM-DD hh:mm:ss"),
        mediaUrl: mediaUrls[0],
      };
    });
    return postsWithMedia;
  } catch (error) {
    console.error("Error retrieving published posts:", error);
    throw error;
  }
}
