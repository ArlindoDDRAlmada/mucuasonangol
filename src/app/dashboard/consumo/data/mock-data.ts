export const monthlyConsumptionData = [
    { month: 'Jan', consumo: 4000 },
    { month: 'Fev', consumo: 3000 },
    { month: 'Mar', consumo: 5000 },
    { month: 'Abr', consumo: 4500 },
    { month: 'Mai', consumo: 6000 },
    { month: 'Jun', consumo: 5500 },
];

export const consumptionHistory = [
    { id: 1, date: '2023-06-01', type: 'Gasolina', volume: 50, price: 15000, location: 'Posto Sonangol - Cacuaco' },
    { id: 2, date: '2023-06-15', type: 'Gás Doméstico', volume: 12, price: 5000, location: 'Revendedor Local' },
    { id: 3, date: '2023-07-01', type: 'Gasolina', volume: 60, price: 18000, location: 'Posto Sonangol - Talatona' },
    { id: 4, date: '2023-07-20', type: 'Gasóleo', volume: 70, price: 14000, location: 'Posto Sonangol - Viana' },
    { id: 5, date: '2023-08-05', type: 'Gasolina', volume: 55, price: 16500, location: 'Posto Sonangol - Cacuaco' },
];

export const gasBottleInfo = {
    size: 12, // kg
    lastPurchaseDate: '2023-08-10',
    averageDailyConsumption: 0.4, // kg
};

export const nationalAverages = {
    gasoline: 180, // Liters per month
    gas: 1.5, // 12kg bottles per month
};

export const kpiData = {
    monthlySavings: 3500, // Kz
    peakTimeReduction: 12, // %
    environmentalImpact: {
        co2Saved: 25, // kg
    },
};