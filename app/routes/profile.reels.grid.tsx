import { useLoaderData } from "react-router";
import { api } from "../services/api";
import { reelsSchema, type Reel } from "../schemas/reel.schema";
import { ReelGridItem } from "../components/ReelGridItem";

export async function loader() {
  try {
    const response = await api.get("/reels?user=webeet_user");
    // Validate and type each reel
    return response.data.map((r: any) => reelsSchema.parse(r));
  } catch (error) {
    console.error(error);
    throw new Response("Reels not found", { status: 404 });
  }
}

export default function ProfileReelsGrid() {
  const reels = useLoaderData() as Reel[];

  if (!reels || reels.length === 0) {
    return <div>No reels found.</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-2 max-w-lg mx-auto p-2">
      {reels.map((reel) => (
        <ReelGridItem key={reel.id} reel={reel} />
      ))}
    </div>
  );
}
