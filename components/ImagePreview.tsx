"use client"

import React from 'react';
import { Image } from "antd";

export default function ImagePreview({images}: {images: string[]}){
 return (
   <div className="flex flex-wrap">
     <Image.PreviewGroup
       preview={{
         onChange: (current, prev) => console.log(`current index: ${current}, prev index: ${prev}`),
       }}
     >
       {images.map((url) => (
         <div className="w-24 h-24 overflow-hidden ml-1 mr-2 mt-2 relative" key={url}>
           <Image src={url} alt="baby image" />
         </div>
       ))}
     </Image.PreviewGroup>
   </div>
 );
}