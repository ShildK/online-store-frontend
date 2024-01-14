import { Product } from "./../types/product";
import { Category } from "../types/category";
import { FilterResponse } from "./models/filterResponse";
import { ProductFilter } from "./models/productFilter";
import { ProductResponse } from "./models/productResponse";
import axios, { BASE_URL } from "../api/axios";
import { debug, log } from "console";

export class ProductService {
   async getProducts(filter: ProductFilter): Promise<ProductResponse> {
      try {
         const response = await axios.get(BASE_URL + "/products", {
            params: filter,
         });
         let products: ProductResponse = JSON.parse(
            JSON.stringify(response.data)
         );
         return products;
      } catch (error) {
         if (error instanceof Error) {
            console.error(error.message);
         }
      }

      let productResponse = new ProductResponse();
      productResponse.currentPage = 1;
      productResponse.pagesCount = 10;
      productResponse.products = [];
      return productResponse;
   }

   async getProductById(productId: number) : Promise<Product>{
      const response = await axios.get(BASE_URL + "/getProductById", {
         params: {
            productId: productId
         },
      });
      let product: Product = JSON.parse(
         JSON.stringify(response.data)
      );
      return product;
   }

   async getFilter(categoryId: number | undefined): Promise<FilterResponse> {
      try {
         const response = await axios.get(BASE_URL + "/filter", {params: {categoryId: categoryId}});
         let filter: FilterResponse = JSON.parse(JSON.stringify(response.data));
         return filter;
      } catch (error) {
         if (error instanceof Error) {
            console.error(error.message);
         }
         console.log(categoryId);
         
         return {priceMin: undefined, priceMax: undefined, brands: []};
      }
   }

   async getCategories(): Promise<Category[]> {
      try {
         const response = await axios.get(BASE_URL + "/category");
         let categories: Category[] = JSON.parse(JSON.stringify(response.data));
         return categories;
      } catch (error) {
         if (error instanceof Error) {
            console.error(error.message);
         }
         return [];
      }
   }
}
