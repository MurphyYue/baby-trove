"use client"

import React, { useState } from 'react';
import { ImageViewer, Image } from 'antd-mobile';

export default function ImagePreview({ images }: { images: string[] }) {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      {images.length === 1 &&
        images.map((url, index) => (
          <div key={url} className="h-72 relative overflow-hidden">
            <div
              className="aspect-w-1 aspect-h-1"
              onClick={() => {
                setVisible(true);
              }}
            >
              <Image src={url} alt="baby image" fit="cover" />
            </div>
          </div>
        ))}
      {images.length === 2 && (
        <div className="flex justify-between">
          {images.map((url, index) => (
            <div
              className="mr-2 w-1/2 h-36 overflow-hidden"
              key={url}
              onClick={() => {
                setVisible(true);
              }}
            >
              <Image className="h-full w-full" src={url} alt="baby image" fit="fill" />
            </div>
          ))}
        </div>
      )}
      {images.length > 2 &&
        images.map((url, index) => (
          <div
            className="w-24 h-24 overflow-hidden ml-1 mr-2 mt-2"
            key={url}
            onClick={() => {
              setVisible(true);
            }}
          >
            <Image width={100} height={100} src={url} alt="baby image" fit="fill" />
          </div>
        ))}
      {images.length > 1 ? (
        <ImageViewer.Multi
          images={images}
          visible={visible}
          defaultIndex={0}
          onClose={() => {
            setVisible(false);
          }}
        />
      ) : (
        <ImageViewer
          image={images[0]}
          visible={visible}
          onClose={() => {
            setVisible(false);
          }}
        />
      )}
    </div>
  );
}