
import React from "react";
import ImagePreview from '../ImagePreview'
import { Post } from './actions'

export default function Timeline({posts}: {posts: Post[]}) {
  // const posts: Post[] = await getPublishedPostsAndMedia();
  return (
    <ol className="relative border-s border-gray-200 dark:border-gray-700">
      {posts.map((post) => (
        <li className="mb-10 ms-6" key={post.id}>
          <div className="absolute w-3 h-3 bg-gray-200 rounded-full mt-1.5 -start-1.5 border border-white dark:border-gray-900 dark:bg-gray-700"></div>
          <time className="mb-1 text-sm font-normal leading-none text-gray-400 dark:text-gray-500">
            {post.updateTime}
          </time>
          <div className="items-center justify-between p-4 bg-white rounded-lg shadow-sm sm:flex dark:bg-gray-700 dark:border-gray-600">
            <ImagePreview images={post.mediaUrls} />
            <p className="text-1xl text-gray-900 dark:text-white mt-2">{post.content}</p>
          </div>
        </li>
      ))}
    </ol>
  );
};
