'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { createRender } from './createRender';
import { Video, Image } from '@/app/lib/db';

export default function RenderButton({ video, videoImages }: { video: Video, videoImages: Image[] }) {
  const router = useRouter();
  const [isRendering, setIsRendering] = useState(false);
  const [progress, setProgress] = useState(0);

  return (
    <div className="space-y-4">
      <button
        className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50 w-full"
        disabled={isRendering}
        onClick={async () => {
          setIsRendering(true);
          try {
            for await (const progressUpdate of await createRender(video, videoImages)) {
              if (progressUpdate.type === "progress") {
                setProgress(progressUpdate.data.progress);
              }
            }


            // Revalidate the page data instead of full reload
            router.refresh();
            setIsRendering(false);
          } catch (error) {
            console.error('Render failed:', error);
            setIsRendering(false);
          }
        }}
      >
        {isRendering ? 'Rendering...' : 'Render ⚙️'}
      </button>

      {isRendering && (
        <div className="w-full">
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300"
              style={{ width: `${progress * 100}%` }}
            />
          </div>
          <div className="text-sm text-gray-600 text-center mt-2">
            {Math.round(progress * 100)}%
          </div>
        </div>
      )}
    </div>
  );
}