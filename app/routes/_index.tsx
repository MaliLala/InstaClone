import { Link } from "react-router";

export default function IndexPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-pink-200 via-purple-200 to-blue-100">
      <div className="flex flex-col items-center">
        <img
          src="/logo192.png"
          alt="InstaClone Logo"
          className="w-24 h-24 mb-4 rounded-full shadow-lg border-4 border-pink-300"
        />
        <h1 className="text-4xl font-extrabold mb-2 tracking-tight text-gray-900">
          InstaClone
        </h1>
        <p className="text-lg text-gray-700 mb-6">
          Connect, share, and explore the world’s moments.
        </p>
        <Link
          to="/home"
          className="bg-gradient-to-r from-pink-500 to-purple-500 text-white px-8 py-3 rounded-full shadow-md text-lg font-semibold hover:scale-105 transition-transform"
        >
          Go to Feed
        </Link>
      </div>
    </div>
  );
}
