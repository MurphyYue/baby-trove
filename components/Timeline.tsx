'use client'

import React from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import Image from "next/image";

export interface TimelineProps {
  posts: Post[];
}

export interface Post {
  id: number;
  title: string;
  updateTime: string;
  content?: string;
  mediaUrl: string;
}

export default function Timeline(posts: TimelineProps) {
  return (
    <VerticalTimeline lineColor="gray">
      {posts.posts.map((post) => (
        <VerticalTimelineElement
          key={post.id}
          visible={true}
          contentStyle={{
            boxShadow: "none",
            border: "1px solid rgba(0, 0, 0, 0.05)",
            textAlign: "left",
            padding: "1.3rem 2rem",
          }}
          dateClassName="text-black"
          date={post.updateTime}
          icon={<div className="h-3 w-3 rounded-full bg-red-500"></div>}
        >
          <Image
            src={post.mediaUrl}
            width={128}
            height={128}
            alt="Baby 1"
            className="w-full md:w-1/2 mb-4 md:mr-4"
          />
          <p className="text-lg text-black">{post.content}</p>
        </VerticalTimelineElement>
      ))}
    </VerticalTimeline>
  );
};
// export default Timeline;
