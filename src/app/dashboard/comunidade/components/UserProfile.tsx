"use client";

import { User } from "../data/users";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { ShieldCheck, Star, Trophy, Users, UserPlus } from "lucide-react";

interface UserProfileProps {
  user: User;
  isCurrentUser?: boolean;
}

const UserProfile = ({ user, isCurrentUser = false }: UserProfileProps) => {
  const getVerificationIcon = () => {
    switch (user.verified) {
      case "premium":
        return <ShieldCheck className="h-5 w-5 text-blue-400" />;
      case "standard":
        return <ShieldCheck className="h-5 w-5 text-green-400" />;
      default:
        return null;
    }
  };

  const getLevelColor = (level: number) => {
    if (level >= 15) return "text-purple-600 dark:text-purple-400";
    if (level >= 10) return "text-blue-600 dark:text-blue-400";
    if (level >= 5) return "text-green-600 dark:text-green-400";
    return "text-gray-600 dark:text-gray-400";
  };

  return (
    <Card className="glassmorphism border-gray-200 dark:border-gray-700">
      <CardHeader className="text-center">
        <Avatar className="h-20 w-20 mx-auto mb-4">
          <AvatarImage src={user.avatar} alt={user.name} />
          <AvatarFallback className="text-2xl">
            {user.name.charAt(0)}
          </AvatarFallback>
        </Avatar>
        <div className="flex items-center justify-center space-x-2">
          <h3 className="text-xl font-bold text-gray-800 dark:text-white">
            {user.name}
          </h3>
          {getVerificationIcon()}
        </div>
        <p className="text-gray-600 dark:text-gray-400">@{user.username}</p>

        {/* Level and Points */}
        <div className="flex items-center justify-center space-x-4 mt-4">
          <div className="text-center">
            <div className={`text-2xl font-bold ${getLevelColor(user.level)}`}>
              {user.level}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Nível
            </div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-yellow-600">
              {user.points.toLocaleString()}
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Pontos
            </div>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Followers/Following Stats */}
        <div className="flex justify-around py-3 border-y border-gray-200 dark:border-gray-700">
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1">
              <Users className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <span className="font-semibold text-gray-800 dark:text-white">
                {user.followers.toLocaleString()}
              </span>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Seguidores
            </div>
          </div>
          <div className="text-center">
            <div className="flex items-center justify-center space-x-1">
              <UserPlus className="h-4 w-4 text-gray-600 dark:text-gray-400" />
              <span className="font-semibold text-gray-800 dark:text-white">
                {user.following.toLocaleString()}
              </span>
            </div>
            <div className="text-xs text-gray-600 dark:text-gray-400">
              Seguindo
            </div>
          </div>
        </div>

        {/* Achievements */}
        {user.achievements.length > 0 && (
          <div>
            <h4 className="font-semibold mb-2 flex items-center text-gray-800 dark:text-white">
              <Trophy className="h-4 w-4 mr-2 text-yellow-600" />
              Conquistas
            </h4>
            <div className="space-y-2">
              {user.achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="flex items-center space-x-2 p-2 bg-gray-100 dark:bg-gray-700 rounded-md"
                >
                  <Star className="h-4 w-4 text-yellow-600" />
                  <span className="text-sm text-gray-800 dark:text-white">
                    {achievement}
                  </span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Action Button */}
        {!isCurrentUser && (
          <Button className="w-full bg-blue-600 hover:bg-blue-700">
            <UserPlus className="h-4 w-4 mr-2" />
            Seguir
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default UserProfile;
