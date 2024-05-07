"use client"
import React, { useState, useEffect } from 'react';
import Timeline from './Timeline'
import GoPostButton from './GoPostButton'
import { InfiniteScroll, DotLoading } from "antd-mobile";
import Loading from "../Loading"

const InfiniteScrollContent = ({ hasMore }: { hasMore?: boolean }) => {
  return (
    <>
      {hasMore ? (
        <>
          <span>Loading</span>
          <DotLoading />
        </>
      ) : (
        <span>--- no more data ---</span>
      )}
    </>
  )
}

function Home() {
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  async function loadMore() {
    setLoading(true);
    try {
      const response: any = await fetch(`/api/posts?page=${page}&pageSize=3`, {
        method: "GET",
      });
      const res = await response.json()
      setData((val) => [...val, ...res.data]);
      setHasMore(res.total > data.length);
      setPage(page + 1);
      setLoading(false);
    } catch (error) {
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadMore();
  }, []);

  return (
    <div className='min-h-full w-full pb-8'>
      {data.length > 0 ? (
        <>
          <Timeline posts={data} />
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
            <InfiniteScrollContent hasMore={hasMore} />
          </InfiniteScroll>
        </>
      ) : (
        loading ? <Loading /> : <div className="h-full w-full flex items-center justify-center flex-col">
          <span className="text-xl mb-2">There is no post </span>
          <GoPostButton />
        </div>
      )}
    </div>
  );
}

export default Home;
