"use server";

import { revalidatePath } from "next/cache";
import { exec, Image } from "@/app/lib/db";

export const updateImageCaption = async (image: Image, caption: string) => {
  exec(/* SQL */`
    UPDATE images SET caption = ? WHERE id = ?
  `, caption, image.id);

  revalidatePath(`/videos/${image.video_id}/edit`);
}