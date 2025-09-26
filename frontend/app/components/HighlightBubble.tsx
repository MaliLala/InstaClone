interface HighlightBubbleProps {
  imageUrl: string;
  label: string;
}

export function HighlightBubble({ imageUrl, label }: HighlightBubbleProps) {
  return (
    <div className="flex flex-col items-center mx-2">
      <div className="rounded-full border-2 border-pink-500 p-1">
        <img src={imageUrl} alt={label} className="w-16 h-16 rounded-full object-cover" />
      </div>
      <span className="text-xs mt-1">{label}</span>
    </div>
  );
}
