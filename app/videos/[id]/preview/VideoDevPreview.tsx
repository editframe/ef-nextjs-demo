"use client";

import { Configuration as EditframeConfiguration, Preview, TogglePlay, Scrubber, TimeDisplay, Workbench } from "@editframe/react";
import * as DB from "@/app/lib/db";
import dynamic from "next/dynamic";

const VideoTemplate = dynamic(() => import("@/video-components/VideoTemplate"), { ssr: false });

export default function VideoPreview({ videoImages, video }: { videoImages: DB.Image[], video: DB.Video }) {
  return (
    <EditframeConfiguration
      signing-url="/api/sign-token"
      api-host="http://localhost:3000"
    >
      <VideoTemplate
        width={500}
        height={500}
        bgColor="#333"
        video={video}
        images={videoImages}
      />
    </EditframeConfiguration>
  );
}