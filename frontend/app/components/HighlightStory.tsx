interface HighlightStoryProps {
  storyImages: string[];
}

export function HighlightStory({ storyImages }: HighlightStoryProps) {
  return (
    <div className="flex overflow-x-auto gap-4 p-2">
      {storyImages.map((img, i) => (
        <img
          key={i}
          src={img}
          alt={`Story ${i + 1}`}
          className="w-32 h-32 rounded-xl object-cover"
        />
      ))}
    </div>
  );
}
