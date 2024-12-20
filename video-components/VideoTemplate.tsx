"use client"; // ⬅ Your preview components must be marked as "use client"

import { Timegroup, Video, Image, useTimingInfo } from "@editframe/react";
import "@editframe/elements/styles.css";
import * as DB from "@/app/lib/db";

export interface VideoTemplateProps {
  width: number;
  height: number;
  bgColor: string;
  video: DB.Video;
  images: DB.Image[];
}

const VideoTemplate = ({ video, width, height, bgColor, images }: VideoTemplateProps) => {
  const { ref, ownCurrentTimeMs, durationMs } = useTimingInfo();
  return (
    <Timegroup
      ref={ref}
      className="overflow-hidden"
      mode="sequence"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: bgColor,
      }}
    >
      <Timegroup className="relative flex flex-col gap-2 items-center justify-center" mode="fixed" duration="3s">
        <h1 className="text-white text-2xl font-bold">{video.title}</h1>
        <p className="text-white text-sm">{video.description}</p>
      </Timegroup>

      {images.map((image) => (
        <Timegroup className="relative" mode="fixed" duration="3s" key={image.id}>
          <h1 className="absolute bottom-20 left-0 right-0 p-4 bg-black/50 text-purple-200 text-3xl font-bold">{image.caption}</h1>
          <Image key={image.id} assetId={image.editframe_id} className="w-full h-full object-contain" />
        </Timegroup>
      ))}

      <div className="font-mono absolute top-0 left-0 right-0 p-[10px] flex flex-col gap-2 bg-black/50 text-pink-400">
        {(ownCurrentTimeMs / 1000).toFixed(2)} / {(durationMs / 1000).toFixed(2)}
      </div>
    </Timegroup>
  );
};

export default VideoTemplate;