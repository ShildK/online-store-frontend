export class ProductFilter {
    priceFrom?: number;
    priceTo?: number;
    categoryId?: number;
    brand? : string;
    orderBy: string;
    limit: number; // лимит элементов на странице
    pageNumber: number;
    text?: string;
}
