import { User } from './users';
export type { User } from './users';

export type Comment = {
    id: string;
    user: User;
    content: string;
    timestamp: string;
};

export type Post = {
    id: string;
    user: User;
    category: 'Dicas Mecânicas' | 'Segurança Rodoviária' | 'Experiências' | 'Promoções' | 'Sustentabilidade';
    content: string;
    media?: { type: 'image' | 'video'; url: string };
    hashtags: string[];
    likes: number;
    comments: Comment[];
    shares: number;
    saves: number;
    timestamp: string;
    aiModerated: boolean;
    sentiment: { positive: number; neutral: number; negative: number };
};

export const posts: Post[] = [
    {
        id: 'p1',
        user: {
            id: 'u1',
            name: 'Ana da Silva',
            username: 'anadasilva',
            avatar: '/avatars/ana.png',
            verified: 'premium',
            level: 15,
            points: 12500,
            achievements: ['Top Contribuidor', 'Mestre da Estrada'],
            followers: 2500,
            following: 150,
        },
        category: 'Dicas Mecânicas',
        content: 'Dica de ouro para manter o motor do seu carro sempre em dia: verifique o nível do óleo a cada 1.000 km. Um motor bem lubrificado é um motor feliz! #ManutençãoAngola #DicasSonangol',
        media: { type: 'image', url: '/posts/oleo-motor.jpg' },
        hashtags: ['#ManutençãoAngola', '#DicasSonangol'],
        likes: 1200,
        comments: [
            { id: 'c1', user: { id: 'u2', name: 'Carlos Gomes', username: 'carlosgomes', avatar: '/avatars/carlos.png', verified: 'standard', level: 10, points: 7800, achievements: ['Explorador Urbano'], followers: 1200, following: 300 }, content: 'Excelente dica, Ana! Faço isso religiosamente.', timestamp: '2025-06-08T10:00:00Z' },
            { id: 'c2', user: { id: 'u4', name: 'David Fernandes', username: 'davidfernandes', avatar: '/avatars/david.png', verified: 'standard', level: 12, points: 9800, achievements: ['Eco-Condutor'], followers: 1800, following: 450 }, content: 'Obrigado pela partilha!', timestamp: '2025-06-08T10:05:00Z' },
        ],
        shares: 350,
        saves: 800,
        timestamp: '2025-06-08T09:30:00Z',
        aiModerated: true,
        sentiment: { positive: 0.85, neutral: 0.1, negative: 0.05 },
    },
    {
        id: 'p2',
        user: {
            id: 'u4',
            name: 'David Fernandes',
            username: 'davidfernandes',
            avatar: '/avatars/david.png',
            verified: 'standard',
            level: 12,
            points: 9800,
            achievements: ['Eco-Condutor'],
            followers: 1800,
            following: 450,
        },
        category: 'Sustentabilidade',
        content: 'Vamos falar de condução ecológica? Pequenos gestos como manter a pressão correta dos pneus e evitar acelerações bruscas podem reduzir o consumo em até 15%. O planeta e a sua carteira agradecem! #EcologiaAO #Sustentabilidade',
        hashtags: ['#EcologiaAO', '#Sustentabilidade'],
        likes: 950,
        comments: [],
        shares: 210,
        saves: 550,
        timestamp: '2025-06-07T18:00:00Z',
        aiModerated: true,
        sentiment: { positive: 0.9, neutral: 0.1, negative: 0 },
    },
    {
        id: 'p3',
        user: {
            id: 'u2',
            name: 'Carlos Gomes',
            username: 'carlosgomes',
            avatar: '/avatars/carlos.png',
            verified: 'standard',
            level: 10,
            points: 7800,
            achievements: ['Explorador Urbano'],
            followers: 1200,
            following: 300,
        },
        category: 'Experiências',
        content: 'Fiz uma viagem incrível de Luanda ao Namibe. As paisagens são de cortar a respiração! Recomendo a todos os amantes da estrada. #AngolaBonita',
        media: { type: 'video', url: '/posts/viagem-namibe.mp4' },
        hashtags: ['#AngolaBonita'],
        likes: 2500,
        comments: [],
        shares: 800,
        saves: 1200,
        timestamp: '2025-06-06T12:00:00Z',
        aiModerated: false,
        sentiment: { positive: 0.95, neutral: 0.05, negative: 0 },
    },
];