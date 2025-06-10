import { User, ShieldCheck, Bell, Lock, Users, BarChart2, Award, Droplet, TrendingUp, Zap } from 'lucide-react';

export const mockUserData = {
    personalInfo: {
        name: 'Alana Sofia',
        email: 'ana.sofia@email.com',
        phone: '+244 923 123 456',
        avatar: '/avatars/ana-sofia.png',
        memberSince: '2023-01-15',
        location: 'Luanda, Angola',
    },
    loyalty: {
        tier: 'Ouro',
        points: 7850,
        nextTier: 'Platina',
        pointsToNextTier: 2150,
        progress: 78.5,
        certificates: [
            { id: 'cert-001', name: 'Certificado de Sustentabilidade Digital 2024', date: '2024-03-22', url: '#' },
            { id: 'cert-002', name: 'Embaixador Eco-Friendly Q1 2024', date: '2024-04-05', url: '#' },
        ],
    },
    achievements: {
        badges: [
            { id: 'badge-01', name: 'Pioneiro Digital', icon: 'Rocket', description: 'Primeira compra com a app.' },
            { id: 'badge-02', name: 'Eco-Campeão', icon: 'Leaf', description: '5 Abastecimentos de EV-olution.' },
            { id: 'badge-03', name: 'Viajante Frequente', icon: 'Plane', description: 'Visita a 10 postos diferentes.' },
            { id: 'badge-04', name: 'Mestre da Poupança', icon: 'PiggyBank', description: 'Poupou 50.000 Kz com descontos.' },
            { id: 'badge-05', name: 'Amigo da Comunidade', icon: 'Users', description: 'Convidou 3 amigos.' },
        ],
        milestones: [
            { id: 'ms-01', name: '1000 Litros Abastecidos', completed: true },
            { id: 'ms-02', name: '1 ano como membro', completed: true },
            { id: 'ms-03', name: '50 Transações', completed: false },
        ],
    },
    privacySettings: {
        profileVisibility: 'friends', // 'public', 'friends', 'private'
        dataSharing: true,
        notificationPreferences: {
            promotions: true,
            updates: true,
            community: false,
        },
        twoFactorAuth: true,
    },
    social: {
        connections: ['facebook', 'google'],
        friends: 128,
        followers: 256,
        communityRank: 'Top 5%',
    },
    aiPersonalization: {
        userSegment: 'Grande Consumidor Eco-consciente',
        recommendations: [
            'Experimente o nosso novo aditivo para maior eficiência.',
            'Visite o posto de Viana, com 15% de desconto em lavagens automáticas para si.',
            'Parabéns! Desbloqueou uma oferta de café gratuito no próximo abastecimento.',
        ],
        behavioralPatterns: [
            'Abastece maioritariamente às sextas-feiras.',
            'Prefere pagamentos com cartão de crédito.',
            'Utiliza frequentemente a funcionalidade de localização de postos.',
        ],
        predictedPreferences: ['Combustível aditivado', 'Lavagem de carro', 'Café na loja de conveniência'],
    },
    personalStats: {
        totalSpent: 750000, // Kz
        totalLitres: 2500,
        environmentalImpact: {
            co2Saved: 150, // kg
            treesPlantedEquivalent: 3,
        },
        costSavings: 65000, // Kz
        favoriteStation: 'Sonangol - Av. 4 de Fevereiro',
        peakActivity: 'Sexta-feira, 18:00',
    },
    transactionHistory: [
        { id: 'txn-001', date: '2024-05-28', station: 'Sonangol - Talatona', amount: 15000, fuelType: 'Gasolina Aditivada', litres: 50, points: 75, status: 'Concluído' },
        { id: 'txn-002', date: '2024-05-20', station: 'Sonangol - Viana', amount: 12000, fuelType: 'EV-olution Carga Rápida', litres: 40, points: 120, status: 'Pendente' },
        { id: 'txn-003', date: '2024-05-12', station: 'Sonangol - Cacuaco', amount: 18000, fuelType: 'Diesel', litres: 60, points: 90, status: 'Concluído' },
        { id: 'txn-004', date: '2024-05-05', station: 'Sonangol - Av. 4 de Fevereiro', amount: 10000, fuelType: 'Gasolina Comum', litres: 33.3, points: 50, status: 'Falhou' },
        { id: 'txn-005', date: '2024-04-28', station: 'Sonangol - Talatona', amount: 15500, fuelType: 'Gasolina Aditivada', litres: 51.6, points: 78, status: 'Concluído' },
    ],
};

export const profileSections = [
    { id: 'info', label: 'Informações Pessoais', icon: User },
    { id: 'loyalty', label: 'Sistema de Fidelidade', icon: Award },
    { id: 'privacy', label: 'Privacidade e Segurança', icon: ShieldCheck },
    { id: 'stats', label: 'Estatísticas e Conquistas', icon: BarChart2 },
    { id: 'social', label: 'Integração Social', icon: Users },
];

export const privacyOptions = [
    { id: 'visibility', label: 'Visibilidade do Perfil', icon: Users, description: 'Controle quem pode ver o seu perfil e atividades.' },
    { id: 'dataSharing', label: 'Partilha de Dados', icon: Droplet, description: 'Gerir como os seus dados são usados para personalização.' },
    { id: 'notifications', label: 'Preferências de Notificação', icon: Bell, description: 'Escolha as notificações que deseja receber.' },
    { id: 'security', label: 'Segurança da Conta', icon: Lock, description: 'Mude a sua palavra-passe e ative a verificação de dois passos.' },
];

export const statsCards = [
    { id: 'litres', label: 'Total de Litros', value: '2,500 L', icon: Droplet, trend: '+5% vs. mês passado' },
    { id: 'savings', label: 'Poupança Total', value: '65,000 Kz', icon: TrendingUp, trend: '+12% vs. mês passado' },
    { id: 'co2', label: 'CO2 Poupança', value: '150 kg', icon: Zap, trend: 'Equivalente a 3 árvores' },
];

export type MockUserData = typeof mockUserData;