import { useLoaderData } from "react-router";
import { api } from "../services/api";
// import { highlightSchema, type Highlight } from "../schemas/highlight.schema";
// import { HighlightBubble } from "../components/HighlightBubble";

export async function loader() {
  try {
    const response = await api.get("/highlights");
    // return response.data.map((h: any) => highlightSchema.parse(h));
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Response("Highlights not found", { status: 404 });
  }
}

export default function HighlightsPage() {
  const highlights = useLoaderData() as any[]; // Replace 'any' with 'Highlight[]' when typed

  if (!highlights || highlights.length === 0) {
    return <div>No highlights found.</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-bold mb-4">Highlights</h2>
      <div className="flex space-x-4">
        {highlights.map((h) => (
          <div key={h.id} className="flex flex-col items-center">
            {/* Replace with: <HighlightBubble imageUrl={h.coverImage} label={h.title} /> */}
            <img
              src={h.coverImage || "/default-highlight.png"}
              alt={h.title}
              className="w-16 h-16 rounded-full object-cover border-2 border-pink-500"
            />
            <span className="text-xs mt-1">{h.title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
