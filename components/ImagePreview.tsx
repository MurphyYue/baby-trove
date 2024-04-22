"use client"

import React, { useState } from 'react';
import { ImageViewer, Image } from 'antd-mobile';

export default function ImagePreview({ images }: { images: string[] }) {
  const [visible, setVisible] = useState(false);
  return (
    <div className="flex flex-wrap">
      {images.map((url, index) => (
        <div
          className="w-24 h-24 overflow-hidden ml-1 mr-2 mt-2 relative"
          key={url}
          onClick={() => {
            setVisible(true);
          }}
        >
          <Image width={100} height={100} src={url} alt="baby image" fit='cover' />
        </div>
      ))}
      {
        images.length > 1 ? <ImageViewer.Multi
          images={images}
          visible={visible}
          defaultIndex={0}
          onClose={() => {
            setVisible(false);
          }}
        /> : <ImageViewer
          classNames={{
            mask: 'customize-mask',
            body: 'customize-body',
          }}
          image={images[0]}
          visible={visible}
          onClose={() => {
            setVisible(false)
          }}
        />
      }
    </div>
  );
}