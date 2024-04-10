"use client";

import React, { useState } from "react";
import { twMerge } from "tailwind-merge";
import { getSignedURL, createPost } from "./actions";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'add new post'
}

export default function CreatePostForm() {
  const [statusMessage, setStatusMessage] = useState("");
  const [content, setContent] = useState("");
  const [file, setFile] = useState<File | null>(null);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      let fileId: number | undefined = undefined;
      if (file) {
        setStatusMessage("Uploading...");
        fileId = await handleFileUpload(file);
      }

      setStatusMessage("Posting post...");
      await createPost({ content, mediaId: fileId });
      setStatusMessage("Post Successful");
    } catch (error) {
      console.error(error);
      setStatusMessage("Post failed");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFile(file);
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    if (file) {
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    } else {
      setPreviewUrl(null);
    }
  };
  return (
    <>
      <form className="border border-neutral-500 rounded-lg px-6 py-4 mt-4" onSubmit={handleSubmit}>
        {statusMessage && (
          <p className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 mb-4 rounded relative">
            {statusMessage}
          </p>
        )}

        <div className="flex gap-4 items-start pb-4 w-full">

          <div className="flex flex-col gap-2 w-full">

            <label className="w-full">
              <input
                className="bg-transparent flex-1 border-none outline-none"
                type="text"
                placeholder="Post a thing..."
                value={content}
                onChange={(e) => setContent(e.target.value)}
              />
            </label>

            {previewUrl && file && (
              <div className="mt-4">
                {file.type.startsWith("image/") ? (
                  <img src={previewUrl} alt="Selected file" />
                ) : file.type.startsWith("video/") ? (
                  <video src={previewUrl} controls />
                ) : null}
              </div>
            )}

            <label className="flex">
              <svg
                className="w-5 h-5 hover:cursor-pointer transform-gpu active:scale-75 transition-all text-neutral-500"
                aria-label="Attach media"
                role="img"
                viewBox="0 0 20 20"
              >
                <title>Attach media</title>
                <path
                  d="M13.9455 9.0196L8.49626 14.4688C7.16326 15.8091 5.38347 15.692 4.23357 14.5347C3.07634 13.3922 2.9738 11.6197 4.30681 10.2794L11.7995 2.78669C12.5392 2.04694 13.6745 1.85651 14.4289 2.60358C15.1833 3.3653 14.9855 4.4859 14.2458 5.22565L6.83367 12.6524C6.57732 12.9088 6.28435 12.8355 6.10124 12.6671C5.94011 12.4986 5.87419 12.1983 6.12322 11.942L11.2868 6.78571C11.6091 6.45612 11.6164 5.97272 11.3088 5.65778C10.9938 5.35749 10.5031 5.35749 10.1808 5.67975L4.99529 10.8653C4.13835 11.7296 4.1823 13.0626 4.95134 13.8316C5.77898 14.6592 7.03874 14.6446 7.903 13.7803L15.3664 6.32428C16.8678 4.81549 16.8312 2.83063 15.4909 1.4903C14.1799 0.179264 12.1584 0.106021 10.6496 1.60749L3.10564 9.16608C1.16472 11.1143 1.27458 13.9268 3.06169 15.7139C4.8488 17.4937 7.6613 17.6109 9.60955 15.6773L15.1027 10.1841C15.4103 9.87653 15.4103 9.30524 15.0881 9.00495C14.7878 8.68268 14.2677 8.70465 13.9455 9.0196Z"
                  className="fill-current"
                ></path>
              </svg>

              <input
                className="bg-transparent flex-1 border-none outline-none hidden"
                name="media"
                type="file"
                accept="image/jpeg,image/png,video/mp4,video/quicktime"
                onChange={handleFileChange}
              />
            </label>
          </div>
        </div>

        <div className="flex justify-between items-center mt-5">
          <div className="text-neutral-500">Characters: {content.length}</div>
          <button
            type="submit"
            className={twMerge(
              "border rounded-xl px-4 py-2 disabled",
              buttonDisabled && "opacity-50 cursor-not-allowed",
            )}
            disabled={buttonDisabled}
            aria-disabled={buttonDisabled}
          >
            Post
          </button>
        </div>
      </form>
    </>
  );
}
