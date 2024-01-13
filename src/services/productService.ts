import { ProductFilter } from "./models/productFilter";
import { ProductResponse } from "./models/productResponse";

class ProductService{
    getProducts(filter: ProductFilter): ProductResponse {
        let productResponse = new ProductResponse();
        productResponse.currentPage = 1;
        productResponse.pagesCount = 10;
        return productResponse;
    }
}