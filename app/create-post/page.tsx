"use client";

import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { getSignedURL, createPost } from "./actions";
import { useSession } from "next-auth/react";
import { AiOutlinePlus } from "react-icons/ai";
import Image from "next/image";
import Link from "next/link";
import { AiFillDelete } from "react-icons/ai";

export default function CreatePostForm() {
  const { data: session, status } = useSession();
  const [statusMessage, setStatusMessage] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [images, setImages] = useState<File[]>([]);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const buttonDisabled = content.length < 1 || loading;

  const computeSHA256 = async (file: File) => {
    const buffer = await file.arrayBuffer();
    const hashBuffer = await crypto.subtle.digest("SHA-256", buffer);
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray.map((b) => b.toString(16).padStart(2, "0")).join("");
    return hashHex;
  };

  const handleFileUpload = async (file: File) => {
    const signedURLResult = await getSignedURL({
      fileSize: file.size,
      fileType: file.type,
      checksum: await computeSHA256(file),
    });
    if (signedURLResult.failure !== undefined) {
      throw new Error(signedURLResult.failure);
    }
    const { url, id: fileId } = signedURLResult.success;
    await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": file.type,
      },
      body: file,
    });
    return fileId;
  };

  const handleFilesUpload = async (files: File[]) => {
    const fileIds: number[] = [];
    for (const file of files) {
      const fileId = await handleFileUpload(file);
      fileIds.push(fileId);
    }
    return fileIds;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!session) {
        throw new Error("no auth");
      }
      let fileIds: number[] | undefined = undefined;
      if (images) {
        setStatusMessage("Uploading...");
        fileIds = await handleFilesUpload(images);
      }
      setStatusMessage("Posting post...");
      await createPost({ content, mediaIds: fileIds });
      setStatusMessage("Post Successful");
    } catch (error) {
      console.error(error);
      setStatusMessage(String(error) || "Post failed");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files: FileList | null = e.target.files;
    if (files && files.length > 9) {
      alert("You can only upload up to 9 images.");
      return;
    }
    if (files && files.length < 1) {
      return;
    }
    if (files && files.length >= 1) {
      const _files = Array.from(files);
      setImages(_files);
    }
  };
  const deImage = (name: string) => {
    const files = images.filter(image => image.name !== name);
    setImages(files);
  };
  return (
    <>
      <form className="px-4 py-4" onSubmit={handleSubmit}>
        <div className="flex justify-between items-center mb-3">
          <Link
            href="/"
            className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
          >
            cancel
          </Link>
          <button
            type="submit"
            className={twMerge(
              "focus:outline-none text-white bg-green-700 hover:bg-green-800 focus:ring-4 focus:ring-green-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-green-600 dark:hover:bg-green-700 dark:focus:ring-green-800",
              buttonDisabled && "opacity-50 cursor-not-allowed",
            )}
            disabled={buttonDisabled}
            aria-disabled={buttonDisabled}
          >
            Post
          </button>
        </div>
        {statusMessage && (
          <p className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 mb-4 rounded relative">
            {statusMessage}
          </p>
        )}

        <div className="flex gap-4 items-start pb-4 w-full">
          <div className="flex flex-col gap-2 w-full">
            <label className="w-full mt-5 mb-5">
              <input
                className="bg-transparent flex-1 border-none outline-none"
                type="text"
                placeholder="Post a thing..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </label>
            <div className="flex flex-wrap">
              {images.map((image) => {
                const src = URL.createObjectURL(image);
                return (
                  <div
                    className="w-24 h-24 overflow-hidden ml-2 mr-2 mt-2 relative"
                    key={image.name}
                  >
                    <Image
                      width={96}
                      height={96}
                      src={src}
                      alt="Selected file"
                      className="min-w-24 h-auto absolute left-0 top-0"
                    />
                    <AiFillDelete
                      className="absolute right-0 top-0 w-5 h-5 text-rose-500"
                      onClick={() => deImage(image.name)}
                    />
                  </div>
                );
              })}
              <label className="mt-2">
                <div className="flex justify-center items-center w-24 h-24 bg-slate-200">
                  <AiOutlinePlus className="w-14 h-14" />
                </div>
                <input
                  className="bg-transparent flex-1 border-none outline-none hidden"
                  name="media"
                  type="file"
                  multiple
                  accept="image/jpeg,image/png"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}
