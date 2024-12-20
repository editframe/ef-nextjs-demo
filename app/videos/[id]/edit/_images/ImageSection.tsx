"use client"
import { TrashIcon } from "@heroicons/react/24/outline";

import { Configuration as EditframeConfiguration, Image as EditframeImage, Preview } from "@editframe/react";

import { Image } from "@/app/lib/db";
import { ImageUploader } from "./ImageUploader";

import { ImageCaptionEditor } from "./ImageCaptionEditor";
import { deleteImage } from "./deleteImage";


export function ImageSection({ videoId, videoImages }: { videoId: string; videoImages: Image[]; }) {
  return (
    <div className="space-y-8 max-h-[100vh] overflow-y-auto">
      <div>
        <ImageUploader videoId={videoId} />
      </div>

      <EditframeConfiguration
        signing-url="/api/sign-token"
        api-host="http://localhost:3000"
      >
        <Preview>
          <div className="mt-6">
            <div className="divide-y divide-gray-200">
              {videoImages.map((image) => (
                <div key={image.id} className="flex items-start justify-between py-2 hover:bg-white/40 transition-colors group">
                  <div className="flex flex-col gap-2">
                    <EditframeImage assetId={image.editframe_id} className="w-16 object-contain" />
                    <p className="text-sm text-gray-600">{image.filename}</p>
                  </div>
                  <div className="shrink-0 flex items-center gap-4">
                    <ImageCaptionEditor image={image} />
                    <button
                      onClick={() => deleteImage(image)}
                      className="p-2 text-gray-400 hover:text-red-500 transition-colors"
                      aria-label="Delete image"
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Preview>
      </EditframeConfiguration>
    </div>
  );
}