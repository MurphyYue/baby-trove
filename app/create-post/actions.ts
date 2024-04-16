"use server"

import { redirect } from "next/navigation";
import { revalidatePath } from "next/cache";
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";
import crypto from "crypto";
import prisma from "@/lib/prisma";
import { getServerSession } from "next-auth/next";
import { OPTIONS } from "@/app/api/auth/[...nextauth]/option";


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
  mediaIds
}: {
  content?: string,
  mediaIds?: number[]
}) => {
  if (!content || content.length < 1) {
    return { failure: "not enough content" };
  }
  const session = await getServerSession(OPTIONS);
  if (!session) {
    return { failure: "please login" };
  }
  let result;
  result = await prisma.post.create({
    data: {
      content: content,
      published: true,
      author: { connect: { email: session.user?.email! } },
    },
  });
  if (mediaIds && mediaIds?.length > 0) {
    for (const mediaId of mediaIds) {
      const result1 = await prisma.media.findUnique({
        where: { id: mediaId },
      });
      if (result1 === null) {
        return { failure: "there are some images can't find in the server " };
      }
      result = await prisma.post.update({
        where: {
          id: result.id,
        },
        data: {
          medias: { connect: { id: mediaId } },
        },
      });
      await prisma.media.update({
        where: {
          id: mediaId,
        },
        data: {
          postId: result.id,
        },
      });
    }
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
      accessKeyId: process.env.AWS_ACCESS_KEY1!,
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