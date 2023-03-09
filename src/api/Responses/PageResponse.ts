export interface PageResponse<T> {
    pageNumber: number;
    pageSize: number;
    totalPages: number;
    totalSize: number;
    content: T[];
}