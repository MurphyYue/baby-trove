import Timeline from "@/components/Timeline";
import { Post } from "@/components/Timeline";
import { Metadata } from "next";
import { getPublishedPostsAndMedia } from "./actions";

export const metadata: Metadata = {
  title: 'Baby Trove',
  description: 'my baby, my trove'
}

export default async function Home() {
  const posts: Post[] = await getPublishedPostsAndMedia();
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="max-w-lg w-full">
        <Timeline posts={posts} />
      </div>
    </div>
  );
}
