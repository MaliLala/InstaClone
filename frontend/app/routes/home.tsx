import type { Route } from "./+types/home";
import React, { useEffect, useState } from "react";
import { postSchema, type Post } from "../schemas/post.schema";
import { PostCard } from "../components/PostCard";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "InstaClone Feed" },
    { name: "description", content: "Your InstaClone home feed" },
  ];
}

export default function Home() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("http://localhost:3000/posts")
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed loading posts");
        const data = await res.json();
        return data.map((p: any) => postSchema.parse(p));
      })
      .then(setPosts)
      .catch((err) => setError(err.message))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <div className="text-center p-4">Loading feed...</div>;
  if (error) return <div className="text-center p-4 text-red-500">{error}</div>;
  if (posts.length === 0) return <div className="text-center p-4">No posts to display.</div>;

  return (
    <div className="max-w-md mx-auto space-y-6 py-6">
      {posts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </div>
  );
}
