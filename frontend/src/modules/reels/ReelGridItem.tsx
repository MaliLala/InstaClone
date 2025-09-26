import type { Reel } from "./reels.types";

/**
 * Simple card with thumbnail and basic metadata.
 */
export function ReelGridItem({ reel }: { reel: Reel }) {
  return (
    <div className="rounded-lg overflow-hidden shadow">
      <img
        src={reel.thumbnailUrl}
        alt={reel.caption ?? "reel"}
        className="w-full h-48 object-cover"
      />
      <div className="p-2 text-sm">
        <div className="font-semibold truncate">{reel.caption ?? "Reel"}</div>
        <div className="text-gray-500">{reel.views} views</div>
      </div>
    </div>
  );
}
