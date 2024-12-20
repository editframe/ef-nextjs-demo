'use client';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import type { Video } from "@/app/lib/db";

export default function VideoList({ videos }: { videos: Video[] }) {
  const router = useRouter();

  return (
    <div className="divide-y divide-gray-200">
      {videos.map(video => (
        <div
          key={video.id}
          className="flex items-center py-2 hover:bg-white/40 transition-colors group cursor-pointer"
          onClick={() => {
            router.push(`/videos/${video.id}/edit`);
          }}
        >
          <div className="flex-1 min-w-0 flex gap-4">
            <div className="w-1/3 truncate font-medium text-gray-900">
              {video.title}
            </div>
            <div className="w-1/2 truncate text-gray-600 text-sm">
              {video.description}
            </div>
          </div>


          <div className="flex gap-1 shrink-0 opacity-40 group-hover:opacity-100 transition-opacity">
            <span
              className="px-2 py-1 text-xs bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded hover:opacity-90 transition-opacity"
            >
              Edit
            </span>
            <Link
              href={`/videos/${video.id}/preview`}
              className="px-2 py-1 text-xs border border-gray-200 text-gray-600 rounded hover:bg-gray-50 transition-colors"
            >
              Preview
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
} 