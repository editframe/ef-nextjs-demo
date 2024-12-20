"use server";

import VideoDevPreview from "./VideoDevPreview";
import { notFound } from "next/navigation";
import { query, Image, Video } from "@/app/lib/db";

export default async function PreviewVideoPage({ params }: { params: { id: string } }) {
  const videoId = (await params).id;

  const [video] = query<Video>(/* SQL */`
    SELECT * FROM videos WHERE id = ?
  `, videoId);

  const videoImages = query<Image>(/* SQL */`
    SELECT * FROM images WHERE video_id = ?
  `, videoId);

  if (!video) {
    notFound()
  }

  return <VideoDevPreview videoImages={videoImages} video={video} />
}
