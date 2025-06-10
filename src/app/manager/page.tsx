"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  DollarSign,
  Users,
  Gauge,
  AlertTriangle,
  Bot,
  TrendingUp,
  CheckCircle2,
} from "lucide-react";
import { StatCard } from "./components/StatCard";
import { Card, CardContent, CardHeader, CardTitle } from "./components/Card";
import {
  managerData, // Changed kpiData to managerData
  revenueChartData,
  fuelSalesData,
  aiAlertsData,
  stationStatusData,
} from "./data/mock-data";

const COLORS = ["#E53935", "#FDD835", "#43A047"];

export default function ManagerPage() {
  return (
    <div className="space-y-6">
      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard
          title="Total de Vendas (Hoje)"
          value={`$${managerData.kpis.totalVendas.hoje.toFixed(2)}`}
          change={managerData.kpis.totalVendas.tendencia.toFixed(2)}
          changeType={
            managerData.kpis.totalVendas.tendencia >= 0
              ? "increase"
              : "decrease"
          }
          icon={<DollarSign className="h-8 w-8 text-gray-400" />}
        />
        <StatCard
          title="Clientes Ativos"
          value={managerData.kpis.clientes.ativos.toString()}
          change={managerData.kpis.clientes.tendencia.toFixed(2)}
          changeType={
            managerData.kpis.clientes.tendencia >= 0 ? "increase" : "decrease"
          }
          icon={<Users className="h-8 w-8 text-gray-400" />}
        />
        <StatCard
          title="Nível de Stock Médio"
          value={`${managerData.kpis.stock.nivelMedio.toFixed(2)}%`}
          change={managerData.kpis.stock.tendencia.toFixed(2)}
          changeType={
            managerData.kpis.stock.tendencia >= 0 ? "increase" : "decrease"
          }
          icon={<Gauge className="h-8 w-8 text-gray-400" />}
        />
        <StatCard
          title="Satisfação do Cliente"
          value={managerData.kpis.satisfacao.media.toFixed(2)}
          change={managerData.kpis.satisfacao.tendencia.toFixed(2)}
          changeType={
            managerData.kpis.satisfacao.tendencia >= 0 ? "increase" : "decrease"
          }
          icon={<CheckCircle2 className="h-8 w-8 text-gray-400" />}
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Revenue Chart */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle>Visão Geral da Receita (Últimos 6 Meses)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={revenueChartData}>
                <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
                <YAxis stroke="hsl(var(--muted-foreground))" />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "hsl(var(--background))",
                    borderColor: "hsl(var(--border))",
                  }}
                />
                <Legend />
                <Bar dataKey="receita" fill="#E53935" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Fuel Sales Chart */}
        <Card>
          <CardHeader>
            <CardTitle>Vendas por Tipo de Combustível</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={fuelSalesData}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  nameKey="name"
                  label
                >
                  {fuelSalesData.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={COLORS[index % COLORS.length]}
                    />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* AI Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bot /> Alertas da Inteligência Artificial
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ul className="space-y-4">
              {aiAlertsData.map((alert) => (
                <li key={alert.id} className="flex items-start gap-4">
                  <div
                    className={`p-2 rounded-full ${
                      alert.priority === "Crítica"
                        ? "bg-red-100 text-red-600"
                        : alert.priority === "Alta"
                        ? "bg-yellow-100 text-yellow-600"
                        : "bg-blue-100 text-blue-600"
                    }`}
                  >
                    {alert.type === "Manutenção Preditiva" ? (
                      <AlertTriangle className="h-5 w-5" />
                    ) : alert.type === "Previsão de Demanda" ? (
                      <TrendingUp className="h-5 w-5" />
                    ) : (
                      <CheckCircle2 className="h-5 w-5" />
                    )}
                  </div>
                  <div>
                    <p className="font-semibold">{alert.type}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {alert.message}
                    </p>
                    <p className="text-xs text-gray-400 dark:text-gray-500">
                      {new Date(alert.timestamp).toLocaleString()}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>

        {/* Station Status */}
        <Card>
          <CardHeader>
            <CardTitle>Estado dos Postos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="border-b dark:border-gray-700">
                    <th className="p-2">Posto</th>
                    <th className="p-2">Estado</th>
                    <th className="p-2">Nível Comb.</th>
                    <th className="p-2">Manutenção</th>
                  </tr>
                </thead>
                <tbody>
                  {stationStatusData.map((station) => (
                    <tr
                      key={station.id}
                      className="border-b dark:border-gray-700 last:border-none"
                    >
                      <td className="p-2 font-medium">{station.name}</td>
                      <td className="p-2">
                        <span
                          className={`px-2 py-1 text-xs font-semibold rounded-full ${
                            station.status === "Online"
                              ? "bg-green-100 text-green-800"
                              : station.status === "Alerta"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {station.status}
                        </span>
                      </td>
                      <td className="p-2">
                        {Math.round(
                          (station.dieselLevel + station.gasolineLevel) / 2
                        )}
                        %
                      </td>
                      <td className="p-2">
                        {station.status === "Manutenção"
                          ? "Agendada"
                          : "Normal"}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
