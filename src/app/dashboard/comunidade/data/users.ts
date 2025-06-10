export type User = {
    id: string;
    name: string;
    username: string;
    avatar: string;
    verified: 'none' | 'standard' | 'premium';
    level: number;
    points: number;
    achievements: string[];
    followers: number;
    following: number;
};

export const users: User[] = [
    {
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
    {
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
    {
        id: 'u3',
        name: 'Beatriz Martins',
        username: 'beatrizmartins',
        avatar: '/avatars/beatriz.png',
        verified: 'none',
        level: 5,
        points: 2300,
        achievements: [],
        followers: 350,
        following: 80,
    },
    {
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
];