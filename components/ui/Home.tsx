import React from 'react';
import Timeline from './Timeline'
import { getPublishedPostsAndMedia } from "@/components/ui/actions";
import { Post } from './actions'
import GoPostButton from './GoPostButton'

async function Home() {
  const posts: Post[] = await getPublishedPostsAndMedia() || [];
  return (
    <>
      {
        posts.length > 0
          ?
          <Timeline posts={posts} />
          :
          <div className='h-full w-full flex items-center justify-center flex-col'>
            <span className='text-xl mb-2'>There is no post </span>
            <GoPostButton />
          </div>
      }
    </>
  );
}

export default Home;