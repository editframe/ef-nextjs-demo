"use client";

import { Configuration as EditframeConfiguration, Preview, TogglePlay, Scrubber, TimeDisplay, Workbench } from "@editframe/react";
import { Video, Image } from "@/app/lib/db";
import dynamic from "next/dynamic";

const VideoTemplate = dynamic(() => import("@/video-components/VideoTemplate"), { ssr: false });

export function VideoPreview({ video, videoImages }: { video: Video, videoImages: Image[] }) {
  return (
    <EditframeConfiguration
      signing-url="/api/sign-token"
      api-host="http://localhost:3000"
    >
      <Preview className="relative w-[500px] h-[500px]">
        <VideoTemplate
          width={500}
          height={500}
          bgColor="#333"
          video={video}
          images={videoImages}
        />

        <div className="absolute bottom-0 left-0 right-0 p-[10px] flex flex-col gap-2 bg-black/50">
          <Scrubber className="w-full" />
          <div className="flex items-center gap-3">
            <TogglePlay>
              <span slot="play">▶️</span>
              <span slot="pause">⏸️</span>
            </TogglePlay>
            <TimeDisplay className="text-white min-w-[80px]" />
          </div>
        </div>
      </Preview>
    </EditframeConfiguration>
  );
}