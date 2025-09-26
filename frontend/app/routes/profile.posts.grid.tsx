import { useLoaderData } from "react-router";
import { api } from "../services/api";
import { postSchema, type Post } from "../schemas/post.schema";
import { PostCard } from "../components/PostCard";

export async function loader() {
  try {
    const response = await api.get("/posts?user=webeet_user");
    // Validate and type each post
    return response.data.map((p: any) => postSchema.parse(p));
  } catch (error) {
    console.error(error);
    throw new Response("Posts not found", { status: 404 });
  }
}

export default function ProfilePostsGrid() {
  const posts = useLoaderData() as Post[];

  if (!posts || posts.length === 0) {
    return <div>No posts found.</div>;
  }

  return (
    <div className="grid grid-cols-3 gap-2 max-w-lg mx-auto p-2">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
