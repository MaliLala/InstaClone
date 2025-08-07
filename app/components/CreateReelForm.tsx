import { useState } from "react";
import { createReel } from "../services/apis"; // Make sure this path is correct for your project

export function CreateReelForm() {
  const [caption, setCaption] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      await createReel({ caption, videoUrl });
      setCaption("");
      setVideoUrl("");
    } catch (err: any) {
      setError("Failed to create reel");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="p-4 flex flex-col gap-2">
      <input
        className="border px-2 py-1 rounded"
        value={caption}
        onChange={e => setCaption(e.target.value)}
        placeholder="Caption"
        required
      />
      <input
        className="border px-2 py-1 rounded"
        value={videoUrl}
        onChange={e => setVideoUrl(e.target.value)}
        placeholder="Video URL"
        required
      />
      <button
        className="bg-blue-500 text-white px-3 py-1 rounded"
        type="submit"
        disabled={loading}
      >
        {loading ? "Posting..." : "Post Reel"}
      </button>
      {error && <div className="text-red-500">{error}</div>}
    </form>
  );
}
