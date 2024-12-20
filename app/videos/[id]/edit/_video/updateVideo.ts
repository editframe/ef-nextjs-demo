"use server";

import { exec } from "@/app/lib/db";
import { revalidatePath } from "next/cache";

export const updateVideo = async (formData: FormData) => {
  const id = formData.get('id') as string
  const title = formData.get('title') as string
  const description = formData.get('description') as string


  exec(/* SQL */`
    UPDATE videos SET title = ?, description = ? WHERE id = ?
  `, title, description, id);

  revalidatePath(`/videos/${id}`)
}