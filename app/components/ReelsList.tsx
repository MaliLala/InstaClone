import React, { useEffect, useState } from "react";
import { getAllReels } from @/modules/reels/reels.services";
import type { Reel } from "@/modules/reels/reels.types";

export function ReelsList() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    getAllReels()
      .then(setReels)
      .catch((err) => setError(err.message || "Error"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div>Loading reels...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (reels.length === 0) return <div>No reels found.</div>;

  return (
    <div>
      <h2>Reels</h2>
      <ul>
        {reels.map((reel) => (
          <li key={reel.id}>
            <video width={200} controls src={reel.video_url}></video>
            <div>{reel.caption}</div>
          </li>
        ))}
      </ul>
    </div>
  );
}