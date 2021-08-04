export interface IProduct {
    id: number;
    name: string;
    description: string;
    cost: number;
    categoryId: number;
    providerId: number;
}

export interface IFoundProduct {
    id: number;
    name: string;
    description: string;
    cost: number;
    category: string;
    provider: string;
}