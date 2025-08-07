import { NavLink, Outlet } from "react-router";

export default function ProfileLayout() {
  const user = {
    username: "webeet_user",
    avatar: "/default-avatar.png",
    bio: "Just a user on InstaClone!",
  };

  const activeLinkStyle = {
    borderBottom: "2px solid black",
    fontWeight: "bold",
  };

  return (
    <div className="max-w-lg mx-auto p-4">
      {/* Profile Header */}
      <div className="flex flex-col items-center mb-4">
        <img
          src={user.avatar}
          alt="Avatar"
          className="w-20 h-20 rounded-full mb-2 border-2 border-gray-300"
        />
        <h2 className="text-xl font-bold">{user.username}</h2>
        <p className="text-gray-500">{user.bio}</p>
      </div>
      {/* Tabs Navigation */}
      <div className="flex justify-center items-center border-b mb-4">
        <NavLink
          to="/profile/posts/grid"
          className="flex-1 text-center p-4"
          style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
        >
          Posts
        </NavLink>
        <NavLink
          to="/profile/reels/grid"
          className="flex-1 text-center p-4"
          style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
        >
          Reels
        </NavLink>
        <NavLink
          to="/profile/highlights"
          className="flex-1 text-center p-4"
          style={({ isActive }) => (isActive ? activeLinkStyle : undefined)}
        >
          Highlights
        </NavLink>
      </div>
      {/* Content for the selected tab */}
      <main>
        <Outlet />
      </main>
    </div>
  );
}
