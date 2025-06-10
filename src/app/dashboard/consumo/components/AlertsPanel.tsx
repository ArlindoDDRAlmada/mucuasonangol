"use client";

import { Bell, Fuel, AlertTriangle } from "lucide-react";

const alerts = [
  {
    id: 1,
    type: "Gás Doméstico",
    message: "Nível baixo! Previsão de término em 3 dias.",
    level: "warning",
  },
  {
    id: 2,
    type: "Manutenção",
    message: "Lembrete: Próxima manutenção do veículo em 15 dias.",
    level: "info",
  },
  {
    id: 3,
    type: "Gasolina",
    message:
      "Sugestão: Abasteça amanhã para evitar a corrida de fim de semana.",
    level: "suggestion",
  },
];

const getAlertIcon = (level: string) => {
  switch (level) {
    case "warning":
      return <AlertTriangle className="text-red-500" />;
    case "info":
      return <Bell className="text-blue-400" />;
    case "suggestion":
      return <Fuel className="text-green-400" />;
    default:
      return <Bell className="text-gray-400" />;
  }
};

const getAlertClasses = (level: string) => {
  switch (level) {
    case "warning":
      return "bg-red-50 dark:bg-red-900/20 border-l-4 border-red-500";
    case "info":
      return "bg-blue-50 dark:bg-blue-900/20 border-l-4 border-blue-400";
    case "suggestion":
      return "bg-green-50 dark:bg-green-900/20 border-l-4 border-green-400";
    default:
      return "bg-gray-50 dark:bg-gray-700/50 border-l-4 border-gray-500";
  }
};

const AlertsPanel = () => {
  return (
    <div className="glassmorphism p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Sistema de Alertas Inteligentes
      </h2>
      <div className="space-y-4">
        {alerts.map((alert) => (
          <div
            key={alert.id}
            className={`p-4 rounded-md flex items-start space-x-4 ${getAlertClasses(
              alert.level
            )}`}
          >
            <div className="flex-shrink-0 mt-1">
              {getAlertIcon(alert.level)}
            </div>
            <div>
              <p className="font-bold text-gray-800 dark:text-white">
                {alert.type}
              </p>
              <p className="text-gray-600 dark:text-gray-300 text-sm">
                {alert.message}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsPanel;
