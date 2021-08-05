export interface IPagination {
    CurrentPage: number;
    HasNext: boolean;
    HasPrevious: boolean;
    PageSize: number;
    TotalCount: number;
    TotalPages: number;
}