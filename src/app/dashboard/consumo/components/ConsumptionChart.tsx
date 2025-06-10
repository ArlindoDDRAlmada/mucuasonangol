"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { consumptionHistory } from "../data/mock-data";

const ConsumptionChart = () => {
  // Process consumptionHistory to aggregate 'price' by month and name the field 'valor'
  const processedData = consumptionHistory.reduce(
    (acc: { mes: string; valor: number }[], item) => {
      const date = new Date(item.date);
      const month = date.toLocaleString("default", { month: "short" });
      const capitalizedMonth = month.charAt(0).toUpperCase() + month.slice(1); // Capitalize first letter

      const existingMonth = acc.find((data) => data.mes === capitalizedMonth);

      if (existingMonth) {
        existingMonth.valor += item.price;
      } else {
        acc.push({ mes: capitalizedMonth, valor: item.price });
      }
      return acc;
    },
    [] as { mes: string; valor: number }[]
  );
  return (
    <div className="glassmorphism p-6 rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 dark:text-white mb-4">
        Visão Geral Mensal
      </h2>
      <div style={{ width: "100%", height: 300 }}>
        <ResponsiveContainer>
          <BarChart
            data={processedData}
            margin={{
              top: 5,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              stroke="rgba(0, 0, 0, 0.1)"
              className="dark:stroke-white/10"
            />
            <XAxis
              dataKey="mes"
              stroke="#6B7280"
              className="dark:stroke-gray-400"
            />
            <YAxis stroke="#6B7280" className="dark:stroke-gray-400" />
            <Tooltip
              contentStyle={{
                backgroundColor: "rgba(255, 255, 255, 0.9)",
                border: "1px solid rgba(0, 0, 0, 0.1)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
                borderRadius: "8px",
              }}
              labelStyle={{ color: "#374151" }}
              itemStyle={{ color: "#374151" }}
            />
            <Legend wrapperStyle={{ color: "#374151", paddingTop: "10px" }} />
            <Bar dataKey="valor" fill="#F59E0B" name="Valor Gasto (Kz)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default ConsumptionChart;
