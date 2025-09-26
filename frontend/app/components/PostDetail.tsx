import React, { useEffect, useState } from "react";
import { useParams } from "react-router";
import { postSchema, type Post } from "../schemas/post.schema";

export function PostDetail() {
  const { id } = useParams<{ id: string }>();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    setLoading(true);
    fetch(`http://localhost:3000/posts/${id}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Post not found");
        const data = await res.json();
        return postSchema.parse(data);
      })
      .then(setPost)
      .catch((err) => setError(err.message || "Error"))
      .finally(() => setLoading(false));
  }, [id]);

  if (loading) return <div>Loading post...</div>;
  if (error) return <div style={{ color: "red" }}>{error}</div>;
  if (!post) return <div>No post found.</div>;

  return (
    <div className="max-w-lg mx-auto p-4 bg-white rounded shadow">
      <div className="mb-4">
        <p className="font-bold">webeet_user</p>
      </div>
      <img
        src={post.img_url}
        alt={post.caption || "Instagram post"}
        className="w-full h-auto aspect-square object-cover mb-4"
      />
      <div>
        <p>
          <span className="font-bold mr-2">webeet_user</span>
          {post.caption}
        </p>
      </div>
      <div className="mt-2 text-gray-500 text-sm">
        Posted: {new Date(post.created_at).toLocaleString()}
      </div>
    </div>
  );
}
