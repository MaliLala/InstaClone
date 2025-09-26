import { useLoaderData } from "react-router";
import { api } from "../services/api";
import { reelsSchema, type Reel } from "../schemas/reel.schema";
import { ReelsList } from "../components/ReelsList";

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

export default function ProfileReelsPage() {
  const reels = useLoaderData() as Reel[];

  if (!reels || reels.length === 0) {
    return <div>No reels found.</div>;
  }

  return (
    <div className="max-w-lg mx-auto p-4">
      <h2 className="text-xl font-bold mb-2">My Reels</h2>
      <ReelsList />
    </div>
  );
}
