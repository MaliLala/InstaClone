import { useEffect, useState } from "react";
import type { Reel } from "./reels.types";
import { getReels } from "./reels.apis";
import { ReelGridItem } from "./ReelGridItem";

/**
 * Fetch-and-render list of reels with basic states.
 */
export function ReelsList() {
  const [reels, setReels] = useState<Reel[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getReels()
      .then(setReels)
      .catch((e) => setError(e instanceof Error ? e.message : "Failed to load reels"))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="p-4 text-center">Loading reels...</div>;
  if (error) return <div className="p-4 text-center text-red-600">{error}</div>;
  if (reels.length === 0) return <div className="p-4 text-center">No reels yet.</div>;

  return (
    <div className="grid grid-cols-2 gap-3 p-3">
      {reels.map((reel) => (
        <ReelGridItem key={reel.id} reel={reel} />
      ))}
    </div>
  );
}
