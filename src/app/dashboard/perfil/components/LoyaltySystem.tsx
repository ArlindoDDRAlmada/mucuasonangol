"use client";

import React from "react";
import { Award, Star, FileText, ChevronRight } from "lucide-react";
import { motion } from "framer-motion";
import { mockUserData } from "../data/mock-data";
import { Progress } from "@/components/ui/progress";

const tierIcon = {
  Bronze: <Star className="text-yellow-700" />,
  Prata: <Star className="text-gray-400" />,
  Ouro: <Award className="text-yellow-500" />,
  Platina: <Award className="text-blue-400" />,
};

const LoyaltySystem: React.FC = () => {
  const { loyalty } = mockUserData;
  const Icon = tierIcon[loyalty.tier as keyof typeof tierIcon] || <Star />;

  return (
    <motion.div
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay: 0.2 }}
      className="bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          Sistema de Fidelidade
        </h2>
        <div className="flex items-center gap-2 text-yellow-500 font-bold">
          {Icon}
          <span>Nível {loyalty.tier}</span>
        </div>
      </div>

      <div className="text-center my-6">
        <p className="text-gray-500 dark:text-gray-400">Total de Pontos</p>
        <p className="text-5xl font-bold text-gray-900 dark:text-white tracking-tight">
          {loyalty.points.toLocaleString()}
        </p>
      </div>

      <div>
        <div className="flex justify-between text-sm font-medium text-gray-600 dark:text-gray-300">
          <span>Progresso para {loyalty.nextTier}</span>
          <span>{loyalty.progress}%</span>
        </div>
        <Progress value={loyalty.progress} className="w-full h-2.5 mt-1" />
        <p className="text-xs text-right text-gray-500 dark:text-gray-400 mt-1">
          Faltam {loyalty.pointsToNextTier.toLocaleString()} pontos para o
          próximo nível
        </p>
      </div>

      <div className="mt-6">
        <h3 className="font-semibold text-gray-700 dark:text-gray-200 mb-2">
          Certificados Digitais
        </h3>
        <ul className="space-y-2">
          {loyalty.certificates.map((cert) => (
            <li key={cert.id}>
              <a
                href={cert.url}
                className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700/50 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <FileText className="text-green-500" />
                  <div>
                    <p className="font-medium text-gray-900 dark:text-white">
                      {cert.name}
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-400">
                      Emitido em: {cert.date}
                    </p>
                  </div>
                </div>
                <ChevronRight className="text-gray-400" />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default LoyaltySystem;
