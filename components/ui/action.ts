'use server';
import prisma, {prismaDisconnect} from "@/lib/prisma";
import dayjs from "dayjs";
import { getServerSession } from "next-auth";
import { authOptions } from '@/lib/auth'
import { redirect } from "next/navigation";

export interface Post {
  id: number;
  title?: string;
  updateTime: string;
  content?: string;
  mediaUrls: string[];
}
export interface PostRes {
  data: Post[],
  total: number
}

export default async function getPublishedPostsAndMedia ({ page, pageSize = 4 }: { page: number, pageSize?: number }){
  console.log("page, pageSize",page, pageSize);
  const session = await getServerSession(authOptions);
  if (!session) {
    redirect('/sign-in');
  }
  
  const offset = (Number(page) - 1) * Number(pageSize);
  // find all the posts that has been published by the user in paged.
  try {
    const posts = await prisma.post.findMany({
      take: pageSize,
      skip: offset,
      where: {
        published: true,
      },
      include: {
        medias: true,
      },
      orderBy: {
        updatedAt: 'desc'
      }
    })
    const count = await prisma.post.count({
      where: {
        published: true,
        author: {
          email: session?.user.email || "",
        },
      }
    })
    console.log('====posts+++',posts);
    
    return {
      data: posts.map((post) => ({
        id: post.id,
        title: post.title || undefined,
        updateTime: dayjs(post.updatedAt).format('YYYY-MM-DD HH:mm:ss'),
        content: post.content || undefined,
        mediaUrls: post.medias.map((media) => media.url),
      })),
      total: count
    }
  } catch (error) {
    prismaDisconnect();
    console.log('====error+++',error)
  }
}
