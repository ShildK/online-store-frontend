import { Product } from "../../types/product";

export class ProductResponse{
    currentPage: number;
    pagesCount: number;
    products: Array<Product>
}