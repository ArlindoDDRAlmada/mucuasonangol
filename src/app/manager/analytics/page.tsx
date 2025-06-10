"use client";

import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  Radar,
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "../components/Card";
import {
  customerSatisfactionData,
  operationalEfficiencyData,
  campaignData,
  heatmapData,
  revenueChartData,
} from "../data/mock-data";
import { TrendingUp, Smile, Zap, Target } from "lucide-react";

const days = ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"];
const hours = Array.from({ length: 24 }, (_, i) => `${i}:00`);

export default function AnalyticsPage() {
  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Predictive Stock Analysis */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Análise Preditiva de Stock (Próximos 7 Dias)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart
                data={revenueChartData.map((d) => ({
                  ...d,
                  previsao: d.receita * (1 + Math.random() * 0.2 - 0.1),
                }))}
              >
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="receita"
                  stroke="#8884d8"
                  name="Venda Real"
                />
                <Line
                  type="monotone"
                  dataKey="previsao"
                  stroke="#E53935"
                  strokeDasharray="5 5"
                  name="Previsão de Demanda"
                />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Customer Sentiment */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Smile /> Sentimento do Cliente
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex justify-around items-center h-full">
              <div className="text-center">
                <p className="text-4xl font-bold text-green-500">
                  {customerSatisfactionData.nps}
                </p>
                <p className="text-sm text-gray-500">NPS</p>
              </div>
              <div className="text-center">
                <p className="text-4xl font-bold text-blue-500">
                  {customerSatisfactionData.retention}%
                </p>
                <p className="text-sm text-gray-500">Retenção</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Zap /> Eficiência Operacional
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-500">
              +{operationalEfficiencyData.efficiency}%
            </p>
            <p className="text-sm text-gray-500">
              Precisão de Previsão:{" "}
              {operationalEfficiencyData.stockPredictionAccuracy}%
            </p>
            <p className="text-sm text-gray-500">
              Redução de Custos: {operationalEfficiencyData.costReduction}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target /> Desempenho de Campanhas
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold text-green-500">
              +{campaignData.roi}%
            </p>
            <p className="text-sm text-gray-500">
              Precisão IA: {campaignData.aiPrecision}%
            </p>
            <p className="text-sm text-gray-500">
              Resolução Chatbot: {campaignData.chatbotResolution}%
            </p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp /> Métricas de Sucesso
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={150}>
              <RadarChart
                cx="50%"
                cy="50%"
                outerRadius="80%"
                data={[
                  {
                    subject: "NPS",
                    A: customerSatisfactionData.nps,
                    fullMark: 100,
                  },
                  {
                    subject: "Retenção",
                    A: customerSatisfactionData.retention,
                    fullMark: 100,
                  },
                  {
                    subject: "Eficiência",
                    A: operationalEfficiencyData.efficiency,
                    fullMark: 100,
                  },
                  { subject: "ROI", A: campaignData.roi, fullMark: 300 },
                ]}
              >
                <PolarGrid />
                <PolarAngleAxis dataKey="subject" />
                <PolarRadiusAxis />
                <Radar
                  name="Performance"
                  dataKey="A"
                  stroke="#E53935"
                  fill="#E53935"
                  fillOpacity={0.6}
                />
              </RadarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Usage Heatmap */}
      <Card>
        <CardHeader>
          <CardTitle>Heatmap de Utilização do Sistema</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <div style={{ width: "100%", fontSize: "10px" }}>
              {days.map((day, dayIndex) => (
                <div key={day} className="flex">
                  <div className="w-10 font-bold">{day}</div>
                  {heatmapData
                    .filter((d) => d.day === dayIndex)
                    .map((data) => (
                      <div
                        key={`${data.day}-${data.hour}`}
                        className="w-6 h-6 m-px"
                        style={{
                          backgroundColor: `rgba(229, 57, 53, ${
                            data.value / 100
                          })`,
                        }}
                        title={`Hora: ${data.hour}, Valor: ${data.value}`}
                      />
                    ))}
                </div>
              ))}
              <div className="flex">
                <div className="w-10"></div>
                {hours.map((hour) => (
                  <div key={hour} className="w-6 text-center">
                    {hour.split(":")[0]}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
