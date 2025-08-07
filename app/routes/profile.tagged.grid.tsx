import React from 'react';
import { useLoaderData, type LoaderFunctionArgs } from 'react-router';
import { Link } from 'react-router-dom';
import type { Post } from "../schemas/post.schema";
import { taggedPostsSchema, type TaggedPost } from "../schemas/tagged.schema";

// Define the Post type to help TypeScript with type checking.
// This should be placed near the top of the file, after the imports.
//type Post = {
  //id: string;
  //imageUrl: string;
  //caption: string;
//};

// This is a mock API service for demonstration purposes.
// In a real application, you would import your actual API service.
const api = {
  get: async (url: string) => {
    // Simulate a network delay to mimic a real API call.
    await new Promise(resolve => setTimeout(resolve, 500));
    console.log(`Mock API Call: GET ${url}`);

    // Mock data for the /tagged/grid endpoint.
    // This data would be fetched from your backend in a real scenario.
    const mockPosts = [
      { id: 'post1', imageUrl: 'https://placehold.co/400x400/FF0000/FFFFFF?text=Tagged+Post+1', caption: 'Exploring a new trail!' },
      { id: 'post2', imageUrl: 'https://placehold.co/400x400/00FF00/FFFFFF?text=Tagged+Post+2', caption: 'Lunch with friends.' },
      { id: 'post3', imageUrl: 'https://placehold.co/400x400/0000FF/FFFFFF?text=Tagged+Post+3', caption: 'Working on a project.' },
      { id: 'post4', imageUrl: 'https://placehold.co/400x400/FFFF00/000000?text=Tagged+Post+4', caption: 'Enjoying the view.' },
    ];
    return { data: mockPosts };
  },
};

// This is a reusable component for displaying a single post card.
// It's styled to be responsive and visually appealing with a hover effect.
function PostCard({ post }: { post: Post }){
  return (
    <div className="relative overflow-hidden rounded-lg shadow-lg aspect-square group">
      {/* The post image, which scales up on hover */}
      <img
        src={post.img_url}
        alt={post.caption ?? ""}
        className="object-cover w-full h-full transition-transform duration-300 group-hover:scale-105"
      />
      {/* The caption overlay, which appears on hover */}
      <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center opacity-0 transition-opacity duration-300 group-hover:opacity-100">
        <p className="text-white text-sm font-semibold p-2 text-center">{post.caption}</p>
      </div>
    </div>
  );
}

export async function loader({ params }: LoaderFunctionArgs): Promise<Post[]> {
  const { data } = await api.get('/tagged/grid');

  // Map raw tagged-post objects into your Post shape
 const rawPosts = data as Array<{
    id: string;
    imageUrl: string;
    caption: string;
  }>;
  
  return rawPosts.map(({ id, imageUrl, caption }) => ({
    id:         Number(id),               // string → number
    img_url:    imageUrl,                 // rename to match schema
    caption:    caption,                  // stays a string
    created_at: new Date().toISOString(), // placeholder timestamp
  }));
}

// This is the main component for the route.
// It displays the title and the grid of posts.
export default function TaggedGridRoute() {
  // The useLoaderData hook retrieves the data returned by the loader function.
  const posts = useLoaderData<Post[]>();

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <h2 className="text-3xl font-bold mb-6 text-center text-gray-800 dark:text-white">Tagged Posts</h2>
      {/* Conditionally render the post grid or a message if no posts are available. */}
      {posts.length > 0 ? (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {posts.map(post => (
            // Render the PostCard component for each post in the data.
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-500">No tagged posts to display.</div>
      )}
    </div>
  );
}