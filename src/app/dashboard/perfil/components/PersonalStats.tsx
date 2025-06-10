"use client";

import React from "react";
import { TrendingUp, MapPin, Clock } from "lucide-react";
import { motion } from "framer-motion";
import { MockUserData, statsCards } from "../data/mock-data";

type PersonalStatsProps = {
  data: MockUserData["personalStats"];
};

const StatCard = ({
  icon: Icon,
  label,
  value,
  trend,
  delay,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  trend: string;
  delay: number;
}) => (
  <motion.div
    initial={{ opacity: 0, y: 20 }}
    animate={{ opacity: 1, y: 0 }}
    transition={{ duration: 0.5, delay }}
    className="bg-gray-50 dark:bg-gray-700/50 p-4 rounded-xl flex items-center gap-4"
  >
    <div className="p-3 bg-blue-100 dark:bg-blue-900/50 rounded-full">
      <Icon className="text-blue-500" size={24} />
    </div>
    <div>
      <p className="text-sm text-gray-500 dark:text-gray-400">{label}</p>
      <p className="text-xl font-bold text-gray-900 dark:text-white">{value}</p>
      <p className="text-xs text-gray-500 dark:text-gray-400">{trend}</p>
    </div>
  </motion.div>
);

const PersonalStats: React.FC<PersonalStatsProps> = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.5 }}
      className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6"
    >
      <h2 className="text-xl font-bold text-gray-900 dark:text-white mb-4">
        Estatísticas Pessoais
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
        {statsCards.map((card, index) => (
          <StatCard
            key={card.id}
            icon={card.icon}
            label={card.label}
            value={card.value}
            trend={card.trend}
            delay={0.6 + index * 0.1}
          />
        ))}
      </div>

      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/50">
          <div className="flex items-center gap-3">
            <MapPin className="text-gray-500" size={18} />
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Posto Favorito:
            </span>
          </div>
          <span className="font-semibold text-gray-900 dark:text-white">
            {data.favoriteStation}
          </span>
        </div>
        <div className="flex justify-between items-center p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/50">
          <div className="flex items-center gap-3">
            <Clock className="text-gray-500" size={18} />
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Horário de Pico:
            </span>
          </div>
          <span className="font-semibold text-gray-900 dark:text-white">
            {data.peakActivity}
          </span>
        </div>
        <div className="flex justify-between items-center p-2 rounded-md hover:bg-gray-50 dark:hover:bg-gray-700/50">
          <div className="flex items-center gap-3">
            <TrendingUp className="text-gray-500" size={18} />
            <span className="font-medium text-gray-700 dark:text-gray-300">
              Total Gasto:
            </span>
          </div>
          <span className="font-semibold text-gray-900 dark:text-white">
            {data.totalSpent.toLocaleString()} Kz
          </span>
        </div>
      </div>
    </motion.div>
  );
};

export default PersonalStats;
