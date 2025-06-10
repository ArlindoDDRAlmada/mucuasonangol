"use client";

import { useState } from "react";
import { Zap } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

const GasCalculator = () => {
  const [selectedBottleSize, setSelectedBottleSize] = useState("3kg");
  const [dailyUsage, setDailyUsage] = useState("");
  const [calculatedDuration, setCalculatedDuration] = useState<number | null>(
    null
  );

  const gasBottleHours: { [key: string]: number } = {
    "3kg": 20,
    "6kg": 40,
    "12kg": 80,
  };

  const handleCalculate = () => {
    const totalHours = gasBottleHours[selectedBottleSize];
    const usage = parseFloat(dailyUsage);

    if (totalHours && usage > 0) {
      const duration = totalHours / usage;
      setCalculatedDuration(Math.round(duration));
    } else {
      setCalculatedDuration(null);
    }
  };

  return (
    <div className="glassmorphism p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
        <Zap className="mr-2 text-yellow-600" /> Calculadora de Gás Doméstico
      </h2>
      <div className="space-y-4">
        <div className="mb-4">
          <label
            htmlFor="bottleSize"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Tamanho da Botija
          </label>
          <select
            id="bottleSize"
            value={selectedBottleSize}
            onChange={(e) => setSelectedBottleSize(e.target.value)}
            className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white focus:ring-yellow-500 focus:border-yellow-500"
          >
            <option value="3kg">3kg</option>
            <option value="6kg">6kg</option>
            <option value="12kg">12kg</option>
          </select>
        </div>

        <div className="mb-4">
          <label
            htmlFor="dailyUsage"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1"
          >
            Uso Diário Médio (horas)
          </label>
          <Input
            type="number"
            id="dailyUsage"
            value={dailyUsage}
            onChange={(e) => setDailyUsage(e.target.value)}
            placeholder="Ex: 2.5"
            className="w-full bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-600 rounded-md px-3 py-2 text-gray-900 dark:text-white focus:ring-yellow-500 focus:border-yellow-500"
          />
        </div>

        <Button
          onClick={handleCalculate}
          className="w-full bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded-md transition duration-300"
        >
          Calcular
        </Button>

        {calculatedDuration !== null && (
          <div className="text-center glassmorphism p-4 rounded-lg mt-4">
            <p className="text-gray-600 dark:text-gray-300">
              A sua botija irá durar aproximadamente:
            </p>
            <p className="text-3xl font-bold text-yellow-600 mt-2">
              {calculatedDuration} dias
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default GasCalculator;
