"use server";
import { CreateVideoForm } from "./CreateVideoForm";
import Link from "next/link";

export default async function NewVideoPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-white to-purple-50">
      <div className="max-w-[90%] mx-auto p-12">
        <div className="mb-16 max-w-3xl">
          <h1 className="text-5xl font-bold text-gray-900 tracking-tight mb-4 bg-clip-text text-transparent bg-gradient-to-r from-indigo-600 to-purple-600">
            Create New Video
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            Create a new video using our AI-powered video generation system
          </p>
        </div>

        <div className="grid gap-8 mb-12">
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl p-10 border border-gray-100/50">
            <div className="mb-6">
              <Link
                href="/videos"
                className="text-indigo-600 hover:text-indigo-800 transition-colors"
              >
                ← Back to Videos
              </Link>
            </div>
            <CreateVideoForm />
          </div>
        </div>
      </div>
    </div>
  )
} 