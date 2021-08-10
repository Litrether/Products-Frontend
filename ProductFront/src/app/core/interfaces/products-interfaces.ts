export interface IProduct {
    id?: number;
    name: string;
    description: string;
    cost: number;
    imageUrl: string;
    category?: string;
    provider?: string;
    categoryId: number;
    providerId: number;
}

export interface IProductParams {
    searchTerm: string,
    fields: string,
    currency: string,
    categories: string,
    providers: string,
    minCost: number,
    maxCost: number,
    pageNumber: number,
    pageSize: number,
    orderBy: string,
}


