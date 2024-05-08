"use client"
import React, { useState } from "react";
import ImagePreview from '../ImagePreview'
import InfiniteScrollContent from "./InfiniteScrollContent";
import { InfiniteScroll, Toast } from 'antd-mobile';
import getPublishedPostsAndMedia, { Post, PostRes } from "./action";

interface TimelineProps {
  posts: Post[];
  more: boolean;
}
let PAGE_SIZE = 4;

const Timeline: React.FC<TimelineProps> = ({ posts, more }) => {
  const [page, setPage] = useState<number>(2);
  const [data, setData] = useState<Post[]>(posts);
  const [hasMore, setHasMore] = useState(more);
  async function loadMore() {
    console.log('loadMore page',page);
    try {
      console.log('start');
      'use server'
      const res = await getPublishedPostsAndMedia({
        page,
        pageSize: PAGE_SIZE
      }) as PostRes;
      console.log('end');
      
      setData((val) => [...val, ...res.data]);
      setTimeout(() => {
        setHasMore(res.total > data.length);
      }, 1);
      setPage(page + 1);
    } catch (error) {
      console.log('error',error);
      
    } finally {
    }
  }
  return (
    <div className='min-h-full w-full pb-8'>
      <ol className="relative border-s border-gray-200 dark:border-gray-700 mx-2 mt-4 mb-[-30px]">
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
      {/* <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
        <InfiniteScrollContent hasMore={hasMore} />
      </InfiniteScroll> */}
      <button onClick={loadMore}>Load more</button>
    </div>
  );
};

export default Timeline;
