import { Video, Image } from "@/app/lib/db";
import { VideoPreview } from "./VideoPreview";
import { EditVideoForm } from "./EditVideoForm";

export const VideoSection = ({ video, videoImages }: { video: Video, videoImages: Image[] }) => {
  return (
    <section>
      <VideoPreview video={video} videoImages={videoImages} />
      <EditVideoForm video={video} />
    </section>
  )
}