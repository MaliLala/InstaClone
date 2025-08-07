import type { Reel } from "./reels.types";

/**
 * ReelGridItem component
 * - Shows a single reel thumbnail in a grid, with overlay actions and view count.
 * - Clickable for potential expansion (e.g., open full reel modal).
 */
export function ReelGridItem({ reel }: { reel: Reel }) {
  return (
    <div className="relative overflow-hidden rounded-lg shadow-md group aspect-square bg-black">
      {/* Reel thumbnail video preview (could be a <video> or just an <img> thumbnail) */}
      <img
        src={reel.thumbnailUrl}
        alt={reel.caption ?? "Reel thumbnail"}
        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
      />
      {/* Overlay with play icon and view count (shows on hover) */}
      <div className="absolute inset-0 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200 bg-black/40">
        <span className="text-4xl text-white mb-2">▶</span>
        <span className="text-white text-sm font-semibold">
          {reel.views.toLocaleString()} views
        </span>
      </div>
    </div>
  );
}
