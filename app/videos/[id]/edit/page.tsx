import { notFound } from 'next/navigation'

import { VideoSection } from './_video/VideoSection';
import { ImageSection } from './_images/ImageSection';
import { RenderSection } from './_render/RenderSection';

import { Video, Image, RenderRecord, query } from '@/app/lib/db';

export default async function EditVideoPage({
  params
}: {
  params: { id: string }
}) {
  const videoId = (await params).id;

  const [video] = query<Video>(/* SQL */`
    SELECT * FROM videos WHERE id = ?
  `, videoId)

  const videoImages = query<Image>(/* SQL */`
    SELECT * FROM images WHERE video_id = ? ORDER BY created_at DESC
  `, videoId)

  const renderRecords = query<RenderRecord>(/* SQL */`
    SELECT * FROM render_records WHERE video_id = ? ORDER BY created_at DESC
  `, videoId)

  if (!video) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50 p-4">
      <div className="grid grid-cols-[1fr_1.5fr_1fr] gap-4">
        <VideoSection video={video} videoImages={videoImages} />
        <ImageSection videoId={videoId} videoImages={videoImages} />
        <RenderSection video={video} videoImages={videoImages} renderRecords={renderRecords} />
      </div>
    </div>
  )
} 