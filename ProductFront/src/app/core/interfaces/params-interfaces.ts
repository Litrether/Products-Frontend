export interface IProductParams extends ICommonParams {
    fields?: string,
    currency?: string,
    categories?: string,
    providers?: string,
    minCost?: number,
    maxCost?: number,
}

export interface ICommonParams {
    searchTerm?: string,
    pageNumber: number,
    pageSize?: number,
    orderBy?: string,
}