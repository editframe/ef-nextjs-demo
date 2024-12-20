"use server";

import { exec } from "@/app/lib/db";
import { revalidatePath } from "next/cache";
import { Image } from "@/app/lib/db";

export async function deleteImage(image: Image) {
  exec(/* SQL */`DELETE FROM images WHERE id = ?`, image.id);
  revalidatePath(`/videos/${image.video_id}`);
} 