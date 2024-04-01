import { NextApiRequest, NextApiResponse } from "next";
import formidable from "formidable";
import prisma from "@/lib/prisma";

export const config = {
  api: {
    bodyParser: false, // 禁用默认的 body 解析器
  },
};

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === "POST") {
    const form = formidable({});

    // 解析请求中的文件
    form.parse(req, async (err, fields, files) => {
      if (err) {
        console.error("Error parsing form:", err);
        res.status(500).json({ error: "Error parsing form" });
        return;
      }

      // 文件信息
      const file = files.file as unknown as formidable.File;

      // 检查是否有上传的文件
      if (!file) {
        res.status(400).json({ error: "No file uploaded" });
        return;
      }

      try {
        // 将照片信息保存到数据库
        const photo = await prisma.photo.create({
          data: {
            filename: file.newFilename,
            // 假设您已经从云存储服务中获得了文件的存储路径
            path: "YOUR_CLOUD_STORAGE_PATH/" + file.newFilename,
            createdAt: new Date(),
          },
        });

        // 返回上传成功的响应
        res.status(200).json({ success: true, photo });
      } catch (error) {
        console.error("Error saving photo to database:", error);
        res.status(500).json({ error: "Error saving photo to database" });
      }
    });
  } else {
    res.status(405).end(); // 不允许除 POST 以外的请求方法
  }
}
