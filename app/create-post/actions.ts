"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import prisma from "@/lib/prisma";

const allowedFileTypes = ["image/jpeg", "image/png", "video/mp4", "video/quicktime"];

const maxFileSize = 1048576 * 10; // 1 MB

const generateFileName = (bytes = 32) => crypto.randomBytes(bytes).toString("hex");


type GetSignedURLParams = {
  fileType: string;
  fileSize: number;
  checksum: string;
};

export const createPost = async ({
  content,
  mediaId
}: {
  content?: string,
  mediaId?: number
}) => {
  if (!content || content.length < 1) {
    return { failure: "not enough content" };
  }
  if (mediaId) {
    const result = await prisma.media.findUnique({
      where: { id: mediaId },
    });
    if (result === null) {
      return { failure: "not enough content" };
    }
  }
  const result = await prisma.post.create({
    data: {
      content: content,
      published: true,
      author: { connect: { email: "murphyyue@icloud.com" } },
      medias: { connect: { id: mediaId } },
    },
  });
  if (mediaId) {
    await prisma.media.update({
      where: {
        id: mediaId,
      },
      data: {
        postId: result.id,
      },
    });
  }
  revalidatePath("/");
  redirect("/");
}

export const getSignedURL = async ({
  fileType,
  fileSize,
  checksum,
}: GetSignedURLParams) => {
  if (!allowedFileTypes.includes(fileType)) {
    return { failure: "File type not allowed" };
  }

  if (fileSize > maxFileSize) {
    return { failure: "File size too large" };
  }

  const s3Client = new S3Client({
    region: process.env.AWS_BUCKET_REGION!,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY!,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY!,
    },
  });
  const fileName = generateFileName();

  const putObjectCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME!,
    Key: fileName,
    ContentType: fileType,
    ContentLength: fileSize,
    ChecksumSHA256: checksum,
  });
  
  const url = await getSignedUrl(
    s3Client,
    putObjectCommand,
    { expiresIn: 60 }, // 60 seconds
  );
  const result = await prisma.media.create({
    data: {
      url: url.split("?")[0],
      type: fileType.startsWith("image") ? "image" : "video",
    },
  });
  return { success: { url, id: result.id } };
};