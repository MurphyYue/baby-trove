import prisma from "@/lib/prisma";
import { TimelineProps } from "@/components/Timeline";

export async function getPublishedPostsAndMedia(): Promise<TimelineProps> {
  try {
    // 查询所有 published 为 true 的帖子
    const publishedPosts = await prisma.post.findMany({
      where: {
        published: true,
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
        title: post.title,
        content: post.content,
        mediaUrl: mediaUrls[0],
      };
    });
    return postsWithMedia;
  } catch (error) {
    console.error("Error retrieving published posts:", error);
    throw error;
  }
}