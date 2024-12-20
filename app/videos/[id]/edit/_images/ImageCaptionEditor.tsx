'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import type { Image } from '@/app/lib/db';
import { updateImageCaption } from './updateImageCaption';
import { revalidatePath } from 'next/cache';

export function ImageCaptionEditor({ image }: { image: Image }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [caption, setCaption] = useState(image.caption || '');
  const [isEditing, setIsEditing] = useState(false);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    await updateImageCaption(image, caption);
    setIsEditing(false);
  }

  if (isEditing) {
    return (
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
          className="flex-grow px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
          placeholder="Enter caption..."
          disabled={isPending}
        />
        <button
          type="submit"
          disabled={isPending}
          className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity disabled:opacity-50"
        >
          {isPending ? 'Saving...' : 'Save'}
        </button>
        <button
          type="button"
          onClick={() => setIsEditing(false)}
          disabled={isPending}
          className="px-4 py-2 text-gray-600 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50"
        >
          Cancel
        </button>
      </form>
    );
  }

  return (
    <div className="flex items-center gap-2">
      <p className="text-gray-600">{caption || 'No caption'}</p>
      <button
        onClick={() => setIsEditing(true)}
        className="text-indigo-600 hover:text-purple-600 transition-colors"
      >
        Edit
      </button>
    </div>
  );
} 