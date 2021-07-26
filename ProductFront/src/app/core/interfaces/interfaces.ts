export interface Product {
    id: number;
    name: string;
    description: string;
    cost: number;
    categoryId: number;
    providerId: number;
}

export interface FoundProduct {
    id: number;
    name: string;
    description: string;
    cost: number;
    categoryName: string;
    providerName: string;
}

export interface Category {
    id?: number;
    name: string;
}

export interface FoundCategory {
    id: number;
    name: string;
}

export interface Provider {
    id?: number;
    name: string;
}

export interface FoundProvider {
    id: number;
    name: string;
}