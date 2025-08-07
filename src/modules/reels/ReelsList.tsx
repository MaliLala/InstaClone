import type { Reel } from "./reels.types";
import { ReelGridItem } from "./ReelGridItem";

/**
 * ReelsList component
 * - Displays a list or grid of reels using ReelGridItem.
 * - You can adapt this for vertical feed or grid view as needed.
 */
export function ReelsList({ reels }: { reels: Reel[] }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {reels.map((reel) => (
        <ReelGridItem key={reel.id} reel={reel} />
      ))}
    </div>
  );
}

