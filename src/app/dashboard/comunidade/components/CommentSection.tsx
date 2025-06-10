"use client";

import { useState } from "react";
import { Comment, User } from "../data/posts";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Send } from "lucide-react";

interface CommentSectionProps {
  comments: Comment[];
  currentUser: User;
  onAddComment: (content: string) => void;
}

const CommentSection = ({
  comments,
  currentUser,
  onAddComment,
}: CommentSectionProps) => {
  const [newComment, setNewComment] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      onAddComment(newComment);
      setNewComment("");
    }
  };

  const formatTimestamp = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("pt-AO", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="pt-4 mt-4 border-t border-gray-700">
      <h4 className="font-semibold mb-4 text-lg">
        Comentários ({comments.length})
      </h4>

      {/* Comment List */}
      <div className="space-y-4 mb-6">
        {comments.map((comment) => (
          <div key={comment.id} className="flex items-start space-x-3">
            <Avatar className="h-9 w-9">
              <AvatarImage src={comment.user.avatar} alt={comment.user.name} />
              <AvatarFallback>{comment.user.name.charAt(0)}</AvatarFallback>
            </Avatar>
            <div className="flex-1 bg-gray-700 p-3 rounded-lg">
              <div className="flex items-center justify-between">
                <p className="font-semibold text-sm">{comment.user.name}</p>
                <p className="text-xs text-gray-400">
                  {formatTimestamp(comment.timestamp)}
                </p>
              </div>
              <p className="text-sm mt-1">{comment.content}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Add Comment Form */}
      <form onSubmit={handleSubmit} className="flex items-start space-x-3">
        <Avatar className="h-9 w-9">
          <AvatarImage src={currentUser.avatar} alt={currentUser.name} />
          <AvatarFallback>{currentUser.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-1 relative">
          <textarea
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            placeholder="Adicione um comentário..."
            className="w-full p-2 pr-12 bg-gray-700 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={1}
            onFocus={(e) => (e.currentTarget.rows = 2)}
            onBlur={(e) => {
              if (!e.currentTarget.value) e.currentTarget.rows = 1;
            }}
          />
          <Button
            type="submit"
            size="icon"
            className="absolute right-2 top-1/2 -translate-y-1/2 bg-transparent hover:bg-gray-600 text-gray-400 hover:text-white"
            disabled={!newComment.trim()}
          >
            <Send className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
};

export default CommentSection;
