"use server";

import { query, Video } from "@/app/lib/db";
import { redirect } from "next/navigation";

export async function createVideo(formData: FormData) {
  const title = formData.get("title") as string;
  const description = formData.get("description") as string;

  const [video] = query<Video>(/* SQL */`
    INSERT INTO videos (title, description)
    VALUES (?, ?)
    RETURNING *
  `, [title, description]);

  redirect(`/videos/${video.id}/edit`);
}