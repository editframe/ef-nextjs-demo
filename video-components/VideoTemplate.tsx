"use client"; // ⬅ Your preview components must be marked as "use client"

import { Timegroup, Audio, Video, Image, useTimingInfo, Waveform } from "@editframe/react";
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
      className="overflow-hidden relative"
      mode="sequence"
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor: bgColor,
      }}
    >
      <Timegroup mode="contain">
        <Timegroup mode="sequence">
          <Timegroup mode="contain" className="flex flex-col items-center justify-center">
            <Video id="bars-n-tone" assetId="2506190f-2e84-4a29-b8a3-9b7a80e439d8" />
            <Waveform target="bars-n-tone" className="w-full h-12 bg-yellow-200 block" />
          </Timegroup>

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

        </Timegroup>
      </Timegroup>
    </Timegroup>
  );
};

export default VideoTemplate;