export interface Station {
    id: number;
    name: string;
    address: string;
    coords: [number, number];
    distance: number;
    travelTime: number;
    rating: number;
    reviewCount: number;
    status: 'Disponível' | 'Stock baixo' | 'Indisponível';
    prices: {
        gasoleo: number;
        gasolina: number;
        gasDomestico: number;
    };
    services: {
        conveniencia: boolean;
        lavagem: boolean;
        mecanica: boolean;
        atm: boolean;
    };
    stockPrediction?: string;
    isRecommended?: boolean;
    waitTime?: string;
}

export const stations: Station[] = [
    {
        id: 1,
        name: 'Sonangol Miramar',
        address: 'Av. 21 de Janeiro, Luanda',
        coords: [-8.814, 13.233],
        distance: 2.5,
        travelTime: 8,
        rating: 4.5,
        reviewCount: 120,
        status: 'Disponível',
        prices: {
            gasoleo: 165,
            gasolina: 180,
            gasDomestico: 3500,
        },
        services: {
            conveniencia: true,
            lavagem: true,
            mecanica: false,
            atm: true,
        },
        stockPrediction: 'Gasóleo disponível até 20h hoje',
        waitTime: '3-5 min',
    },
    {
        id: 2,
        name: 'Pumangol Patriota',
        address: 'Estrada da Samba, Luanda',
        coords: [-8.901, 13.208],
        distance: 5.1,
        travelTime: 15,
        rating: 4.2,
        reviewCount: 88,
        status: 'Stock baixo',
        prices: {
            gasoleo: 170,
            gasolina: 185,
            gasDomestico: 3600,
        },
        services: {
            conveniencia: true,
            lavagem: false,
            mecanica: true,
            atm: true,
        },
        stockPrediction: 'Gasolina pode esgotar em 2 horas',
        waitTime: '8-12 min',
    },
    {
        id: 3,
        name: 'Sonangol Aeroporto',
        address: 'Aeroporto 4 de Fevereiro, Luanda',
        coords: [-8.858, 13.259],
        distance: 3.8,
        travelTime: 12,
        rating: 4.0,
        reviewCount: 95,
        status: 'Disponível',
        prices: {
            gasoleo: 168,
            gasolina: 182,
            gasDomestico: 3550,
        },
        services: {
            conveniencia: true,
            lavagem: true,
            mecanica: true,
            atm: false,
        },
        waitTime: '5-7 min',
    },
    {
        id: 4,
        name: 'TotalEnergies Cacuaco',
        address: 'Via Expressa, Cacuaco',
        coords: [-8.777, 13.399],
        distance: 12.0,
        travelTime: 25,
        rating: 3.8,
        reviewCount: 45,
        status: 'Indisponível',
        prices: {
            gasoleo: 160,
            gasolina: 300,
            gasDomestico: 2500,
        },
        services: {
            conveniencia: true,
            lavagem: false,
            mecanica: false,
            atm: true,
        },
    },
    {
        id: 5,
        name: 'Sonangol Viana',
        address: 'Estrada de Viana, Luanda',
        coords: [-8.933, 13.383],
        distance: 15.5,
        travelTime: 30,
        rating: 4.6,
        reviewCount: 210,
        status: 'Disponível',
        prices: {
            gasoleo: 155,
            gasolina: 295,
            gasDomestico: 2450,
        },
        services: {
            conveniencia: true,
            lavagem: true,
            mecanica: true,
            atm: true,
        },
        stockPrediction: 'Preço do gasóleo pode subir amanhã',
    },
    {
        id: 6,
        name: 'Pumangol Talatona',
        address: 'Av. Samora Machel, Talatona',
        coords: [-8.883, 13.233],
        distance: 8.2,
        travelTime: 18,
        rating: 4.8,
        reviewCount: 350,
        status: 'Disponível',
        prices: {
            gasoleo: 160,
            gasolina: 300,
            gasDomestico: 2500,
        },
        services: {
            conveniencia: true,
            lavagem: true,
            mecanica: false,
            atm: true,
        },
    },
    {
        id: 7,
        name: 'Sonangol Golf 2',
        address: 'Rua da Missão, Golf 2',
        coords: [-8.869, 13.288],
        distance: 6.7,
        travelTime: 20,
        rating: 4.1,
        reviewCount: 75,
        status: 'Stock baixo',
        prices: {
            gasoleo: 162,
            gasolina: 305,
            gasDomestico: 2520,
        },
        services: {
            conveniencia: false,
            lavagem: true,
            mecanica: true,
            atm: false,
        },
    },
    {
        id: 8,
        name: 'TotalEnergies Ilha',
        address: 'Av. Murtala Mohamed, Ilha de Luanda',
        coords: [-8.790, 13.231],
        distance: 1.5,
        travelTime: 5,
        rating: 4.9,
        reviewCount: 412,
        status: 'Disponível',
        prices: {
            gasoleo: 162,
            gasolina: 178,
            gasDomestico: 3450,
        },
        services: {
            conveniencia: true,
            lavagem: false,
            mecanica: false,
            atm: true,
        },
        stockPrediction: 'Melhor preço da região + sem filas',
        isRecommended: true,
        waitTime: '2-3 min',
    },
];