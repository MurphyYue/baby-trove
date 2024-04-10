
import React from "react";
import Image from "next/image";
import { getPublishedPostsAndMedia } from "@/app/actions";

export interface TimelineProps {
  posts: Post[];
}

export interface Post {
  id: number;
  title?: string;
  updateTime: string;
  content?: string;
  mediaUrl: string;
}

export default async function Timeline() {
  const posts: Post[] = await getPublishedPostsAndMedia();
  return (
    <section className="text-black">
      {posts.map((post) => (
        <div key={post.id}>
          <span>{post.updateTime}</span>
          <span>{post.content}</span>
          <Image
            src={post.mediaUrl}
            width={128}
            height={128}
            alt="Baby 1"
            className="w-full md:w-1/2 mb-4 md:mr-4"
          />
        </div>
      ))}
    </section>
  );
};
