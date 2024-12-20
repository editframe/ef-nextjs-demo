"use server";

import { exec } from "@/app/lib/db";
import { editframeClient } from "@/app/lib/editframeClient";

import { createImageFile, uploadImageFile } from "@editframe/api";
import { randomUUID } from "crypto";
import { revalidatePath } from "next/cache";

export async function uploadImage(formData: FormData) {
  const file = formData.get("file") as File;
  const width = formData.get("width") as string;
  const height = formData.get("height") as string;
  const videoId = formData.get("videoId") as string;

  if (!file.type.startsWith("image/")) {
    throw new Error("File is not an image");
  }

  const imageRecord = await createImageFile(editframeClient, {
    width: parseInt(width, 10),
    height: parseInt(height, 10),
    // FIXME: make md5 optional
    md5: randomUUID(),
    filename: file.name,
    mime_type: file.type as "image/jpeg" | "image/png" | "image/jpg" | "image/webp",
    byte_size: file.size,
  });

  const upload = uploadImageFile(editframeClient, {
    id: imageRecord.id,
    byte_size: file.size,
  }, file.stream());

  upload.whenUploaded().then(() => {
    exec(/* SQL */ `
      INSERT INTO images (video_id, editframe_id, filename, caption, created_at)
      VALUES (?, ?, ?, ?, ?)
    `, [
      parseInt(videoId, 10),
      imageRecord.id,
      file.name,
      "Caption...",
      Math.floor(Date.now() / 1000)
    ]);

    revalidatePath(`/videos/${videoId}`);
  });

  return upload;
}