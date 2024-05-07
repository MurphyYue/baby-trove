"use client"
import React from 'react';
import { DotLoading } from "antd-mobile";

const InfiniteScrollContent= ({ hasMore }: { hasMore?: boolean }) => {
  return (
    <>
      {hasMore ? (
        <span className='mb-2 mt-[-12px]'>
          <span>Loading</span>
          <DotLoading />
        </span>
      ) : (
        <span className='mb-2 mt-[-12px]'>--- no more data ---</span>
      )}
    </>
  )
}

export default InfiniteScrollContent;