"use client"
import React, { useState, useEffect } from 'react';
import Timeline from './Timeline'
import { Post } from "./actions";
import GoPostButton from './GoPostButton'
import { InfiniteScroll } from "antd-mobile";
import Loading from "@/app/Loading";

function Home() {
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<Post[]>([]);
  const [hasMore, setHasMore] = useState(true);
  // const [loading, setLoading] = useState(false);
  async function loadMore() {
    const response: any = await fetch(`/api/posts?page=${page}&pageSize=3`, {
      method: "GET",
    });
    const res = await response.json()
    setData((val) => [...val, ...res.data]);
    setHasMore(res.total > data.length);
    setPage(page+1);
  }
  useEffect(() => {
    loadMore();
  }, [])
  return (
    <>
      {data.length > 0 ? (
        <>
          <Timeline posts={data} />
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore} />
        </>
      ) : (
        <div className="h-full w-full flex items-center justify-center flex-col">
          <span className="text-xl mb-2">There is no post </span>
          <GoPostButton />
        </div>
      )}
    </>
  );
}

export default Home;