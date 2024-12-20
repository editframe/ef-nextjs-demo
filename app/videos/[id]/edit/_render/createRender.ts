"use server"
import { resolve } from 'path';

import * as api from '@editframe/api';
import { bundleRender } from '@editframe/api/bundleRender';

import { Video, Image, exec, query, RenderRecord } from '@/app/lib/db';
import { editframeClient } from '@/app/lib/editframeClient';
import { VideoTemplateProps } from '@/video-components/VideoTemplate';

export async function createRender(
  video: Video,
  videoImages: Image[]
) {
  const templatePath = resolve(process.cwd(), "template")

  const renderData = {
    width: 500,
    height: 500,
    bgColor: "#000000",
    video,
    images: videoImages.map((image) => ({
      id: image.id,
      video_id: video.id,
      editframe_id: image.editframe_id,
      created_at: image.created_at,
      filename: image.filename,
      caption: image.caption,
      strategy: "v1"
    }))
  } satisfies VideoTemplateProps

  const tarStream = await bundleRender({
    root: templatePath,
    renderData
  })

  const render = await api.createRender(
    editframeClient,
    {
      fps: 30,
    }
  )

  const [renderRecord] = query<RenderRecord>(/* SQL */`
    INSERT INTO render_records (render_id, video_id, status)
    VALUES (?, ?, ?)
    RETURNING *
  `, render.id, video.id, "created");


  await api.uploadRender(editframeClient, render.id, tarStream);

  async function* renderProgress() {
    for await (const progressUpdate of await api.getRenderProgress(editframeClient, render.id)) {
      yield progressUpdate;
    }

    exec(/* SQL */`
      UPDATE render_records
      SET status = 'complete'
      WHERE id = ?
    `, renderRecord.id);
  }

  return renderProgress();
}