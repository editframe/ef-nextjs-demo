'use client';

import { useState, useTransition } from 'react';
import { useRouter } from 'next/navigation';
import { uploadImage } from './uploadImage';

const getImageDimensions = async (file: File) => {
  return new Promise<{ width: number; height: number }>((resolve) => {
    const img = new Image();
    img.src = URL.createObjectURL(file);
    img.onload = () => {
      URL.revokeObjectURL(img.src);
      resolve({ width: img.naturalWidth, height: img.naturalHeight });
    };
  });
};

export function ImageUploader({ videoId }: { videoId: string }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files?.length) return;

    setUploading(true);
    setUploadProgress(0);

    const file = e.target.files[0];

    try {
      // Get image dimensions before upload
      const dimensions = await getImageDimensions(file);

      const formData = new FormData();
      formData.append('file', file);
      formData.append('width', dimensions.width.toString());
      formData.append('height', dimensions.height.toString());
      formData.append('videoId', videoId);

      for await (const progress of await uploadImage(formData)) {
        setUploadProgress(progress.progress);
      }


      // Refresh the page after successful upload
      startTransition(() => {
        router.refresh();
      });
    } catch (error) {
      console.error('Upload error:', error);
      alert('Failed to upload image');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-4">
        <label className="px-6 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg cursor-pointer hover:opacity-90 transition-opacity">
          <span>{uploading || isPending ? 'Uploading...' : 'Add Image'}</span>
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            disabled={uploading || isPending}
            className="hidden"
          />
        </label>

        {uploading && (
          <div className="text-gray-600">
            {Math.round(uploadProgress * 100)}%
          </div>
        )}
      </div>
    </div>
  );
} 