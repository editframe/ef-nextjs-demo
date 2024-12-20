import type { Video } from '@/app/lib/db'

import { updateVideo } from './updateVideo'

export function EditVideoForm({ video }: { video: Video }) {
  return (
    <form
      className="space-y-4"
      action={updateVideo}
    >
      <input type="hidden" name="id" value={video.id} />
      <div>
        <label htmlFor="title" className="block text-gray-800 font-semibold mb-1">
          Title
        </label>
        <input
          type="text"
          id="title"
          name="title"
          required
          defaultValue={video.title}
          className="w-full px-3 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
      <div>
        <label htmlFor="description" className="block text-gray-800 font-semibold mb-1">
          Subtitle
        </label>
        <input
          type="text"
          id="description"
          name="description"
          defaultValue={video.description ?? ''}
          className="w-full px-3 py-1.5 border border-gray-200 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
        />
      </div>
      <button
        type="submit"
        className="px-4 py-2 bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-opacity"
      >
        Save changes
      </button>
    </form>
  )
} 