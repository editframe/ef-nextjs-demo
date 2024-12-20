"use server";
import Link from "next/link";
import { query, Video } from '../lib/db';
import VideoList from "./VideoList";

export default async function VideosPage() {
  const videos = query<Video>(/* SQL */`SELECT * FROM videos`);

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-[90%] mx-auto p-8">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-4xl font-bold text-gray-900 tracking-tight mb-2 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
              Video Management
            </h1>
            <p className="text-lg text-gray-600">
              Transform your content into engaging video experiences
            </p>
          </div>
          <Link
            href="/videos/new"
            className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-md hover:opacity-90 transition-opacity"
          >
            Create New Video
          </Link>
        </div>

        <div className="bg-white/70 backdrop-blur-sm rounded-lg shadow p-6 border border-gray-100/50">
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">Your Videos</h2>
          <VideoList videos={videos} />
        </div>
      </div>
    </div>
  )
} 