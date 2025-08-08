import { useState } from "react";
// Use the tsconfig path alias so we don't fight relative paths from /app/*
import { createReel } from "@/modules/reels/reels.apis";

/**
 * Simple form to create a reel.
 * - Fields: caption, videoUrl, optional thumbnailUrl
 * - On submit, calls POST /reels with a safe payload
 */
export function CreateReelForm() {
  const [caption, setCaption] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [thumbnailUrl, setThumbnailUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [ok, setOk] = useState<string | null>(null);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError(null);
    setOk(null);

    try {
      await createReel({
        caption: caption || null,
        videoUrl,
        thumbnailUrl: thumbnailUrl || undefined,
      });
      setCaption("");
      setVideoUrl("");
      setThumbnailUrl("");
      setOk("Reel created.");
    } catch (err: any) {
      setError(err?.message ?? "Failed to create reel");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-3 max-w-md">
      <input
        className="border px-2 py-1 rounded"
        value={caption}
        onChange={(e) => setCaption(e.target.value)}
        placeholder="Caption"
      />
      <input
        className="border px-2 py-1 rounded"
        value={videoUrl}
        onChange={(e) => setVideoUrl(e.target.value)}
        placeholder="Video URL"
        required
      />
      <input
        className="border px-2 py-1 rounded"
        value={thumbnailUrl}
        onChange={(e) => setThumbnailUrl(e.target.value)}
        placeholder="Thumbnail URL (optional)"
      />

      <button
        className="bg-blue-500 text-white px-3 py-1 rounded disabled:opacity-60"
        type="submit"
        disabled={loading}
      >
        {loading ? "Saving..." : "Create Reel"}
      </button>

      {ok && <div className="text-green-600 text-sm">{ok}</div>}
      {error && <div className="text-red-600 text-sm">{error}</div>}
    </form>
  );
}
