import { RenderRecord, RenderStatus } from "@/app/lib/db";

export default function RenderList({ renderRecords }: { renderRecords: RenderRecord[] }) {
  return (
    <div className="divide-y divide-gray-200">
      {renderRecords.map((record) => (
        <div
          key={record.id}
          className="flex items-center justify-between py-2 hover:bg-white/40 transition-colors group"
        >
          <StatusDisplay status={record.status} />
          {record.status === "complete" && (
            <div className="shrink-0 opacity-40 group-hover:opacity-100 transition-opacity">
              <a
                href={`${process.env.EF_HOST}/api/v1/renders/${record.render_id}.mp4`}
                className="px-2 py-1 text-xs bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded hover:opacity-90 transition-opacity"
                download
              >
                Download ↧
              </a>
            </div>
          )}
        </div>
      ))}
    </div>
  )
}

const StatusColors = {
  "complete": "bg-green-500/40 border-green-500 text-green-500",
  "created": "bg-yellow-500/40 border-yellow-500 text-yellow-500",
  "failed": "bg-red-500/40 border-red-500 text-red-500",
  "pending": "bg-yellow-500/40 border-yellow-500 text-yellow-500",
  "rendering": "bg-yellow-500/40 border-yellow-500 text-yellow-500",
} as const

const StatusDisplay = ({ status }: { status: RenderStatus }) => {
  // @ts-ignore
  const color = StatusColors[status] ?? "bg-gray-500/10 border-gray-500 text-gray-500"
  return (
    <div className="flex items-center gap-2">
      <div className={`border ${color} size-2 rounded-full`}></div>
      <div className="text-sm text-gray-600">{status}</div>
    </div>
  )
}