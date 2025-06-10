"use client";

import React from "react";
import { BrainCircuit, Sparkles, Target, Lightbulb } from "lucide-react";
import { motion } from "framer-motion";
import { MockUserData } from "../data/mock-data";

type AIPersonalizationProps = {
  data: MockUserData["aiPersonalization"];
};

const AIPersonalization: React.FC<AIPersonalizationProps> = ({ data }) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      className="bg-gradient-to-br from-blue-500 to-indigo-600 dark:from-blue-800 dark:to-indigo-900 text-white shadow-lg rounded-2xl p-6"
    >
      <div className="flex items-center gap-3 mb-4">
        <BrainCircuit size={28} />
        <h2 className="text-xl font-bold">Personalização IA</h2>
      </div>

      <div className="bg-white/10 p-4 rounded-lg mb-4">
        <div className="flex items-center gap-3">
          <Target size={24} className="text-yellow-300" />
          <div>
            <p className="text-sm opacity-80">O seu Perfil de Consumo</p>
            <p className="font-semibold text-lg">{data.userSegment}</p>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <div>
          <h3 className="font-semibold flex items-center gap-2 mb-2">
            <Sparkles size={18} className="text-yellow-300" />
            Recomendações para Si
          </h3>
          <ul className="space-y-2 list-inside pl-2">
            {data.recommendations.map((rec, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: 0.7 + index * 0.1 }}
                className="text-sm bg-white/5 p-2 rounded-md"
              >
                {rec}
              </motion.li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="font-semibold flex items-center gap-2 mb-2">
            <Lightbulb size={18} className="text-yellow-300" />
            Padrões de Comportamento
          </h3>
          <ul className="space-y-2 list-inside pl-2">
            {data.behavioralPatterns.map((pattern, index) => (
              <li key={index} className="text-sm opacity-90">
                {pattern}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
};

export default AIPersonalization;
