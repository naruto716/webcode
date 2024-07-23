export interface MetaData {
    currentPage: number;
    totalPages: number;
    pageSize: number;
    totalCount: number;
}

// need to match the names of the pagination header
export class PaginatedResponse<T> {
    items: T;
    metaData: MetaData;
    
    constructor(items: T, metaData: MetaData) {
        this.items = items;
        this.metaData = metaData;
    }
}