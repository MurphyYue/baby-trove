import Timeline from "@/components/Timeline";
import { Post } from "@/components/Timeline";
import Navbar from "@/components/Navbar";

import { getPublishedPostsAndMedia } from "./actions";

export default async function Home() {
  const posts: Post[] = await getPublishedPostsAndMedia();
  return (
    <div className="flex justify-center items-center min-h-screen bg-white">
      <div className="max-w-lg w-full">
        <Navbar />
        <Timeline posts={posts} />
      </div>
    </div>
  );
}
