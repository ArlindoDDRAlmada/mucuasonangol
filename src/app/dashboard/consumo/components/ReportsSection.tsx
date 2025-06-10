"use client";

import { FileText, Download, BarChart2, DollarSign, Leaf } from "lucide-react";
import { consumptionHistory, kpiData } from "../data/mock-data";

const ReportsSection = () => {
  const totalSpent = consumptionHistory.reduce(
    (acc, item) => acc + item.price,
    0
  );

  return (
    <div className="glassmorphism p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4 flex items-center">
        <FileText className="mr-2 text-yellow-600" /> Análises e Relatórios
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-white/50 dark:bg-gray-700 p-4 rounded-lg flex items-center">
          <DollarSign className="text-green-600 h-8 w-8 mr-4" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Total Gasto (Últimos 3 meses)
            </p>
            <p className="text-lg font-bold text-gray-800 dark:text-white">
              {totalSpent.toLocaleString("pt-AO", {
                style: "currency",
                currency: "AOA",
              })}
            </p>
          </div>
        </div>
        <div className="bg-white/50 dark:bg-gray-700 p-4 rounded-lg flex items-center">
          <BarChart2 className="text-blue-600 h-8 w-8 mr-4" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              Redução em Horário de Pico
            </p>
            <p className="text-lg font-bold text-gray-800 dark:text-white">
              {kpiData.peakTimeReduction}%
            </p>
          </div>
        </div>
        <div className="bg-white/50 dark:bg-gray-700 p-4 rounded-lg flex items-center">
          <Leaf className="text-teal-600 h-8 w-8 mr-4" />
          <div>
            <p className="text-sm text-gray-600 dark:text-gray-300">
              CO₂ Poupança
            </p>
            <p className="text-lg font-bold text-gray-800 dark:text-white">
              {kpiData.environmentalImpact.co2Saved} kg
            </p>
          </div>
        </div>
      </div>

      <div>
        <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-3">
          Histórico de Consumo Detalhado
        </h3>
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white/50 dark:bg-gray-700 rounded-lg">
            <thead>
              <tr className="border-b border-gray-300 dark:border-gray-600">
                <th className="text-left p-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Data
                </th>
                <th className="text-left p-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Tipo
                </th>
                <th className="text-right p-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Volume
                </th>
                <th className="text-right p-3 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Custo (Kz)
                </th>
              </tr>
            </thead>
            <tbody>
              {consumptionHistory.map((item) => (
                <tr
                  key={item.id}
                  className="border-b border-gray-200 dark:border-gray-800 hover:bg-gray-100/50 dark:hover:bg-gray-600/50"
                >
                  <td className="p-3 text-gray-800 dark:text-gray-200">
                    {new Date(item.date).toLocaleDateString("pt-AO")}
                  </td>
                  <td className="p-3 text-gray-800 dark:text-gray-200">
                    {item.type}
                  </td>
                  <td className="p-3 text-right text-gray-800 dark:text-gray-200">
                    {item.volume} {item.type === "Gás Doméstico" ? "kg" : "L"}
                  </td>
                  <td className="p-3 text-right text-green-600 font-medium">
                    {item.price.toLocaleString("pt-AO")}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-6 text-right">
        <button className="bg-yellow-500 hover:bg-yellow-600 text-gray-900 font-bold py-2 px-4 rounded-lg inline-flex items-center transition-colors">
          <Download className="mr-2 h-5 w-5" />
          Exportar Relatório
        </button>
      </div>
    </div>
  );
};

export default ReportsSection;
