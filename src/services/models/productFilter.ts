import { OrderType } from "../enum/orderType";

export interface ProductFilter {
    priceFrom?: number;
    priceTo?: number;
    categoryId?: number;
    orderBy: OrderType;
    limit: number; // лимит элементов на странице
    pageNumber: number;
}
