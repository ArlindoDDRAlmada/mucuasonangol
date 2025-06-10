import { Suspense } from "react";
import ConsumptionChart from "./components/ConsumptionChart";
import GasCalculator from "./components/GasCalculator";
import AlertsPanel from "./components/AlertsPanel";
import ReportsSection from "./components/ReportsSection";
import AIPoweredInsights from "./components/AIPoweredInsights";
import { Loader } from "lucide-react";

const ConsumoPage = () => {
  return (
    <div className="p-4 md:p-8 min-h-screen">
      <header className="mb-8">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-yellow-600 to-red-600 bg-clip-text text-transparent">
          Gestão Inteligente de Consumo
        </h1>
        <p className="mt-2 text-gray-600 dark:text-gray-300">
          O seu centro de controlo para otimizar o consumo de combustível e gás.
        </p>
      </header>

      <Suspense
        fallback={
          <div className="flex justify-center items-center h-64">
            <Loader className="animate-spin h-12 w-12 text-yellow-600" />
          </div>
        }
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Coluna Principal */}
          <div className="lg:col-span-2 space-y-8">
            <ConsumptionChart />
            <ReportsSection />
          </div>

          {/* Coluna Lateral */}
          <div className="space-y-8">
            <AIPoweredInsights />
            <GasCalculator />
            <AlertsPanel />
          </div>
        </div>
      </Suspense>
    </div>
  );
};

export default ConsumoPage;
