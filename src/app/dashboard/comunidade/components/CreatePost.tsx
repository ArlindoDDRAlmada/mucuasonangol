"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Send } from "lucide-react";

interface CreatePostProps {
  onCreatePost: (content: string) => void;
}

const CreatePost = ({ onCreatePost }: CreatePostProps) => {
  const [content, setContent] = useState("");

  const handleSubmit = () => {
    if (!content.trim()) return;

    onCreatePost(content);
    setContent("");
  };

  return (
    <Card className="glassmorphism border-gray-200 dark:border-gray-700 mb-6">
      <CardHeader className="pb-3">
        {/* Removed user avatar and info as it's not needed for this component anymore */}
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Content Input */}
        <div>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Escreva a sua publicação..."
            className="w-full p-3 bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            rows={4}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex items-center justify-end pt-3 border-t border-gray-200 dark:border-gray-700">
          <Button
            onClick={handleSubmit}
            disabled={!content.trim()}
            className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
          >
            <Send className="h-4 w-4 mr-2" />
            Publicar
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CreatePost;
