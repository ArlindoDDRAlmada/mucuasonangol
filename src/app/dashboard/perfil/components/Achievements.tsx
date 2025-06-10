"use client";

import React from "react";
import { motion } from "framer-motion";
import { mockUserData } from "../data/mock-data";
import { Rocket, Leaf, Plane, PiggyBank, Users } from "lucide-react";

const iconMap: { [key: string]: React.ElementType } = {
  Rocket: Rocket,
  Leaf: Leaf,
  Plane: Plane,
  PiggyBank: PiggyBank,
  Users: Users,
};

const Achievements: React.FC = () => {
  const achievements = mockUserData.achievements.badges;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.4 }}
      className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6"
    >
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Conquistas
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {achievements.map((achievement, index) => {
          const IconComponent = iconMap[achievement.icon];
          return (
            <motion.div
              key={achievement.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              className="bg-gray-100 dark:bg-gray-700 p-4 rounded-lg shadow flex items-center space-x-4"
            >
              <div className="text-blue-500">
                {IconComponent ? (
                  <IconComponent size={32} />
                ) : (
                  <div className="w-8 h-8" />
                )}
              </div>
              <div>
                <h3 className="font-bold text-gray-900 dark:text-white">
                  {achievement.name}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {achievement.description}
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
};

export default Achievements;
