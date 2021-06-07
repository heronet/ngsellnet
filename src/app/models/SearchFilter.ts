export interface SearchFilter {
    name: string;
    category: string;
    sortParam: string;
    division: string;
    city: string;
    pageSize?: number;
    pageNumber?: number;
    sellerId?: string;
}