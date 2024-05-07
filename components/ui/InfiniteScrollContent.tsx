"use client"
import React from 'react';
import { DotLoading } from "antd-mobile";

const InfiniteScrollContent= ({ hasMore }: { hasMore?: boolean }) => {
  return (
    <>
      {hasMore ? (
        <>
          <span className='mb-2 mt-[-12px]'>Loading</span>
          <DotLoading />
        </>
      ) : (
        <span className='mb-2 mt-[-12px]'>--- no more data ---</span>
      )}
    </>
  )
}

export default InfiniteScrollContent;