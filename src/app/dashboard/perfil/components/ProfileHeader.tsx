"use client";

import React from "react";
import Image from "next/image";
import { Award, Edit, Upload } from "lucide-react";
import { motion } from "framer-motion";
import { MockUserData } from "../data/mock-data";

type ProfileHeaderProps = {
  personalInfo: MockUserData["personalInfo"];
  loyalty: MockUserData["loyalty"];
};

const tierColors = {
  Bronze: "bg-yellow-700",
  Prata: "bg-gray-400",
  Ouro: "bg-yellow-500",
  Platina: "bg-blue-400",
};

const tierTextColors = {
  Bronze: "text-yellow-700",
  Prata: "text-gray-400",
  Ouro: "text-yellow-500",
  Platina: "text-blue-400",
};

const ProfileHeader: React.FC<ProfileHeaderProps> = ({
  personalInfo,
  loyalty,
}) => {
  const tierColorClass =
    tierColors[loyalty.tier as keyof typeof tierColors] || "bg-gray-500";
  const tierTextColorClass =
    tierTextColors[loyalty.tier as keyof typeof tierTextColors] ||
    "text-gray-500";

  return (
    <motion.div
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center gap-6"
    >
      <div className="relative group">
        <Image
          src={personalInfo.avatar}
          alt={`Avatar de ${personalInfo.name}`}
          width={128}
          height={128}
          className="rounded-full border-4 border-white dark:border-gray-700 shadow-md group-hover:opacity-80 transition-opacity duration-300"
        />
        <label
          htmlFor="avatar-upload"
          className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300 cursor-pointer"
        >
          <Upload className="text-white" size={32} />
          <input id="avatar-upload" type="file" className="hidden" />
        </label>
      </div>
      <div className="flex-grow text-center md:text-left">
        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white">
          {personalInfo.name}
        </h1>
        <p className="text-gray-500 dark:text-gray-400 mt-1">
          {personalInfo.email}
        </p>
        <div
          className={`mt-4 flex items-center justify-center md:justify-start gap-2 font-semibold ${tierTextColorClass}`}
        >
          <Award size={20} />
          <span>Nível {loyalty.tier}</span>
        </div>
      </div>
      <div className="w-full md:w-auto flex flex-col items-center md:items-end gap-4">
        <button className="flex items-center gap-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors duration-300 shadow">
          <Edit size={18} />
          Editar Perfil
        </button>
        <div className="w-full md:w-64">
          <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-300">
            <span>{loyalty.points.toLocaleString()} Pontos</span>
            <span className={tierTextColorClass}>{loyalty.nextTier}</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 mt-1">
            <motion.div
              className={`h-2.5 rounded-full ${tierColorClass}`}
              style={{ width: `${loyalty.progress}%` }}
              initial={{ width: 0 }}
              animate={{ width: `${loyalty.progress}%` }}
              transition={{ duration: 1, ease: "easeOut" }}
            />
          </div>
          <p className="text-xs text-right text-gray-500 dark:text-gray-400 mt-1">
            Faltam {loyalty.pointsToNextTier.toLocaleString()} pontos
          </p>
        </div>
      </div>
    </motion.div>
  );
};

export default ProfileHeader;
