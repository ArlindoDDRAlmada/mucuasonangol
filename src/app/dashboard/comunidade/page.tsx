"use client";

import { useState } from "react";
import Image from "next/image";
import { posts as initialPosts, Post } from "./data/posts";
import { users } from "./data/users";
import PostCard from "./components/PostCard";
import CreatePost from "./components/CreatePost";
import UserProfile from "./components/UserProfile";
import { Flame, Users, TrendingUp } from "lucide-react";

const ComunidadePage = () => {
  const [posts, setPosts] = useState<Post[]>(initialPosts);
  const currentUser = users[0]; // Assuming the first user is the logged-in user

  const handleCreatePost = (content: string) => {
    const newPost: Post = {
      id: Math.random().toString(36).substr(2, 9),
      user: users[0], // The first user from the imported users array
      timestamp: new Date().toISOString(),
      content: content,
      likes: 0,
      comments: [],
      shares: 0,
      category: "Experiências", // Default category
      hashtags: [], // No hashtags for now
      saves: 0,
      aiModerated: false,
      sentiment: { positive: 0, neutral: 0, negative: 0 },
    };
    setPosts([newPost, ...posts]);
  };

  const topContributors = [...users]
    .sort((a, b) => b.points - a.points)
    .slice(0, 3);

  const trendingTopics = [
    {
      topic: "#ManutençãoAngola",
      posts: 1.2,
      icon: <Flame className="h-4 w-4 text-red-500" />,
    },
    {
      topic: "#EstradasDeAngola",
      posts: 987,
      icon: <TrendingUp className="h-4 w-4 text-green-500" />,
    },
    {
      topic: "#CombustívelAditivado",
      posts: 754,
      icon: <TrendingUp className="h-4 w-4 text-green-500" />,
    },
    {
      topic: "#SonangolMais",
      posts: 632,
      icon: <Flame className="h-4 w-4 text-red-500" />,
    },
  ];

  return (
    <div className="min-h-screen p-4 sm:p-6 lg:p-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 max-w-screen-2xl mx-auto">
        {/* Left Sidebar - User Profile */}
        <aside className="lg:col-span-3 space-y-6">
          <UserProfile user={currentUser} isCurrentUser />
        </aside>

        {/* Main Content - Feed */}
        <main className="lg:col-span-6 space-y-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent mb-4">
            Comunidade Sonangol
          </h1>
          <CreatePost onCreatePost={handleCreatePost} />
          <div className="space-y-6">
            {posts.map((post) => (
              <PostCard key={post.id} post={post} />
            ))}
          </div>
        </main>

        {/* Right Sidebar - Gamification & Trends */}
        <aside className="lg:col-span-3 space-y-6">
          {/* Top Contributors */}
          <div className="glassmorphism p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-lg mb-4 flex items-center text-gray-800 dark:text-white">
              <Users className="h-5 w-5 mr-2 text-yellow-600" />
              Top Contribuidores
            </h3>
            <div className="space-y-3">
              {topContributors.map((user, index) => (
                <div key={user.id} className="flex items-center space-x-3">
                  <span className="font-bold text-gray-600 dark:text-gray-400">
                    {index + 1}
                  </span>
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={32}
                    height={32}
                    className="h-8 w-8 rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-sm text-gray-800 dark:text-white">
                      {user.name}
                    </p>
                    <p className="text-xs text-gray-600 dark:text-gray-400">
                      {user.points.toLocaleString()} pontos
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Trending Topics */}
          <div className="glassmorphism p-4 rounded-lg border border-gray-200 dark:border-gray-700">
            <h3 className="font-bold text-lg mb-4 flex items-center text-gray-800 dark:text-white">
              <TrendingUp className="h-5 w-5 mr-2 text-yellow-600" />
              Tópicos do Momento
            </h3>
            <div className="space-y-3">
              {trendingTopics.map((item) => (
                <div
                  key={item.topic}
                  className="flex items-center justify-between"
                >
                  <div className="flex items-center space-x-2">
                    {item.icon}
                    <span className="font-semibold text-sm hover:underline cursor-pointer text-gray-800 dark:text-white">
                      {item.topic}
                    </span>
                  </div>
                  <span className="text-xs text-gray-600 dark:text-gray-400">
                    {item.posts}k posts
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </div>
  );
};

export default ComunidadePage;
