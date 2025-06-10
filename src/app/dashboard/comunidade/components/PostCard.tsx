"use client";

import { Post } from "../data/posts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import {
  MessageCircle,
  Heart,
  Share2,
  Bookmark,
  MoreHorizontal,
  ShieldCheck,
  Bot,
} from "lucide-react";
import Image from "next/image";

interface PostCardProps {
  post: Post;
}

const PostCard = ({ post }: PostCardProps) => {
  const {
    user,
    content,
    media,
    hashtags,
    likes,
    comments,
    shares,
    saves,
    timestamp,
    aiModerated,
    sentiment,
  } = post;

  const formatTimestamp = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-AO", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <Card className="glassmorphism border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden">
      <CardHeader className="p-4 flex flex-row items-start">
        <Avatar className="h-12 w-12 mr-4">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <div className="flex items-center">
            <p className="font-bold text-gray-800 dark:text-white">
              {user.name}
            </p>
            {user.verified === "premium" && (
              <ShieldCheck className="h-5 w-5 text-blue-400 ml-2" />
            )}
            <p className="text-sm text-gray-600 dark:text-gray-400 ml-2">
              @{user.username}
            </p>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-500">
            {formatTimestamp(timestamp)}
          </p>
        </div>
        <Button variant="ghost" size="icon">
          <MoreHorizontal className="h-5 w-5" />
        </Button>
      </CardHeader>
      <CardContent className="p-4">
        <p className="mb-4 text-gray-800 dark:text-white">{content}</p>
        {media && (
          <div className="rounded-lg overflow-hidden mb-4">
            {media.type === "image" ? (
              <Image
                src={media.url}
                alt="Post media"
                width={500}
                height={300}
                className="w-full h-auto object-cover"
              />
            ) : (
              <video src={media.url} controls className="w-full h-auto" />
            )}
          </div>
        )}
        <div className="flex flex-wrap gap-2">
          {hashtags.map((tag) => (
            <span
              key={tag}
              className="text-blue-600 dark:text-blue-400 text-sm cursor-pointer hover:underline"
            >
              {tag}
            </span>
          ))}
        </div>
        {aiModerated && (
          <div className="flex items-center text-xs text-gray-600 dark:text-gray-400 mt-4 p-2 bg-gray-100 dark:bg-gray-700 rounded-md">
            <Bot className="h-4 w-4 mr-2" />
            <span>Moderado por IA</span>
            <div className="w-px h-4 bg-gray-400 dark:bg-gray-600 mx-2"></div>
            <span>{`Sentimento: ${(sentiment.positive * 100).toFixed(
              0
            )}% positivo`}</span>
          </div>
        )}
      </CardContent>
      <CardFooter className="p-4 flex justify-between border-t border-gray-200 dark:border-gray-700">
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-white"
        >
          <MessageCircle className="h-5 w-5" /> {comments.length}
        </Button>
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-pink-500"
        >
          <Heart className="h-5 w-5" /> {likes}
        </Button>
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-green-500"
        >
          <Share2 className="h-5 w-5" /> {shares}
        </Button>
        <Button
          variant="ghost"
          className="flex items-center gap-2 text-gray-600 dark:text-gray-400 hover:text-yellow-500"
        >
          <Bookmark className="h-5 w-5" /> {saves}
        </Button>
      </CardFooter>
    </Card>
  );
};

export default PostCard;
