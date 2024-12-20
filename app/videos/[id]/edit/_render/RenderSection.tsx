import { Video, Image, RenderRecord } from "@/app/lib/db";
import RenderButton from "./RenderButton";
import RenderList from "./RenderList";

export const RenderSection = ({
  video,
  videoImages,
  renderRecords,
}: {
  video: Video;
  videoImages: Image[];
  renderRecords: RenderRecord[];
}) => {
  return (
    <section className="max-h-[100vh] overflow-y-auto">
      <RenderButton video={video} videoImages={videoImages} />
      <div className="mt-6">
        <RenderList renderRecords={renderRecords} />
      </div>
    </section>
  );
};
