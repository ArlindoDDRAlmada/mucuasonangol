"use client";

import { Lightbulb, TrendingUp, AlertTriangle } from "lucide-react";

const insights = [
  {
    id: 1,
    icon: <Lightbulb className="text-yellow-600" />,
    title: "Padrão de Consumo",
    text: "Baseado no seu padrão, a sua botija de gás dura em média 28 dias.",
  },
  {
    id: 2,
    icon: <TrendingUp className="text-green-600" />,
    title: "Sugestão de Economia",
    text: "Pode economizar até 12% se reduzir o uso do veículo durante os horários de pico (7h-9h).",
  },
  {
    id: 3,
    icon: <AlertTriangle className="text-orange-600" />,
    title: "Alerta Preditivo",
    text: "Prevê-se a necessidade de reabastecer a sua viatura nos próximos 2 dias.",
  },
];

const AIPoweredInsights = () => {
  return (
    <div className="glassmorphism p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Insights com IA
      </h2>
      <div className="space-y-4">
        {insights.map((insight) => (
          <div
            key={insight.id}
            className="flex items-start space-x-4 p-3 bg-white/50 dark:bg-gray-700/50 rounded-lg"
          >
            <div className="flex-shrink-0 text-2xl">{insight.icon}</div>
            <div>
              <h3 className="font-semibold text-gray-800 dark:text-white">
                {insight.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {insight.text}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AIPoweredInsights;
