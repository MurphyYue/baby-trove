"use client"
import React, { useState, useEffect } from 'react';
import Timeline from './Timeline'
import GoPostButton from './GoPostButton'
import { InfiniteScroll, Toast } from "antd-mobile";
import Loading from "../Loading"
import InfiniteScrollContent from "./InfiniteScrollContent"

const PAGE_SIZE = 5;

function Home() {
  const [page, setPage] = useState<number>(1);
  const [data, setData] = useState<any[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  async function loadMore() {
    setLoading(true);
    try {
      const response: any = await fetch(`/api/posts?page=${page}&pageSize=${PAGE_SIZE}`, {
        method: "GET",
      });
      const res = await response.json();
      setLoading(false);
      if (res.status !== 200) {
        Toast.show({
          icon: 'fail',
          content: res.message,
        });
        return;
      }
      setData((val) => [...val, ...res.data]);
      setTimeout(() => {
        setHasMore(res.total > data.length);
      }, 1);
      setPage(page + 1);
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
    <>
      {data.length > 0 ? (
        <div className='min-h-full w-full pb-8'>
          <Timeline posts={data} />
          <InfiniteScroll loadMore={loadMore} hasMore={hasMore}>
            <InfiniteScrollContent hasMore={hasMore} />
          </InfiniteScroll>
        </div>
      ) : (
        loading ? <Loading /> : <div className="min-h-full w-full flex items-center justify-center flex-col">
          <span className="text-xl mb-2">There are no posts</span>
          <GoPostButton />
        </div>
      )}
    </>
  );
}

export default Home;
