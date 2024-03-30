'use client'

import React from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import babyImg from "@/public/100.jpg";
import Image from "next/image";

export default function Timeline() {
  return (
    <VerticalTimeline lineColor="gray">
      <VerticalTimelineElement
        visible={true}
        contentStyle={{
          boxShadow: "none",
          border: "1px solid rgba(0, 0, 0, 0.05)",
          textAlign: "left",
          padding: "1.3rem 2rem",
        }}
        dateClassName="text-black"
        date="2022-10-01"
        icon={<div className="h-3 w-3 rounded-full bg-red-500"></div>}
      >
        <Image src={babyImg} alt="Baby 1" className="w-full md:w-1/2 mb-4 md:mr-4" />
        <p className="text-lg text-black">Baby took his first steps today!</p>
      </VerticalTimelineElement>
    </VerticalTimeline>
  );
};
