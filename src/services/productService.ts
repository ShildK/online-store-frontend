import { Product } from "./../types/product";
import { Category } from "../types/category";
import { products } from "./mock/products";
import { FilterResponse } from "./models/filterResponse";
import { ProductFilter } from "./models/productFilter";
import { ProductResponse } from "./models/productResponse";

export class ProductService {
   getProducts(filter: ProductFilter): ProductResponse {
      let productResponse = new ProductResponse();
      productResponse.currentPage = 1;
      productResponse.pagesCount = 10;
      productResponse.products = products.map((product) => {
         let p = new Product();
         p.id = product.id;
         p.categoryId = product.categoryId;
         p.name = product.name;
         p.message = product.message;
         p.brand = product.brand;
         p.image = product.image;
         p.price = product.price;
         return p;
      });

      if (filter.categoryId !== undefined) {
         productResponse.products = productResponse.products.filter(
            (product) => product.categoryId === filter.categoryId
         );
      }
      return productResponse;
   }

   getFilter(categoryId: number | undefined): FilterResponse {
      let filterResponse = new FilterResponse();
      filterResponse.priceMin = 1000;
      filterResponse.priceMax = 7000;
      filterResponse.brands = ["Lactel", "Садочок", "Мое"];
      return filterResponse;
   }

   getCategories(): Category[] {
      let categories: Category[] = [];
      categories.push({
         id: 1,
         parentId: undefined,
         name: "Свежие овощи, фрукты",
         icon: "https://arbuz.kz/image/s3/arbuz-kz-catalogs/225164-svezhie_ovoshi_i_frukty.svg",
      });
      categories.push({
         id: 2,
         parentId: undefined,
         name: "Молоко, сыр, масло, яйца",
         icon: "https://arbuz.kz/image/s3/arbuz-kz-catalogs/225161-moloko_syr_maslo_yaica.svg",
      });
      categories.push({
         id: 3,
         parentId: undefined,
         name: "Сладости",
         icon: "https://arbuz.kz/image/s3/arbuz-kz-catalogs/225166-sladosti.svg",
      });
      categories.push({
         id: 4,
         parentId: 1,
         name: "Фрукты",
         icon: "https://arbuz.kz/image/s3/arbuz-kz-catalogs/225177-frukty.png?w=140&h=%h&_c=1661257436",
      });
      categories.push({
         id: 5,
         parentId: 1,
         name: "Овощи",
         icon: "https://arbuz.kz/image/s3/arbuz-kz-catalogs/225178-ovoshi.png?w=140&h=%h&_c=1661257454",
      });
      categories.push({
         id: 6,
         parentId: 2,
         name: "Молоко",
         icon: "https://arbuz.kz/image/s3/arbuz-kz-catalogs/19986-moloko_smetana_maslo.png?w=140&h=%h&_c=1703062029",
      });
      categories.push({
         id: 7,
         parentId: 2,
         name: "Сыр",
         icon: "https://arbuz.kz/image/s3/arbuz-kz-catalogs/20160-syry.png?w=140&h=%h&_c=1661258680",
      });
      categories.push({
         id: 8,
         parentId: 2,
         name: "Масло",
         icon: "https://arbuz.kz/image/s3/arbuz-kz-catalogs/225446-slivochnoe_maslo.jpg?w=140&h=%h&_c=1689717880",
      });
      categories.push({
         id: 9,
         parentId: 2,
         name: "Яйца",
         icon: "https://arbuz.kz/image/s3/arbuz-kz-catalogs/225245-yaica.png?w=140&h=%h&_c=1661258649",
      });
      categories.push({
         id: 10,
         parentId: 3,
         name: "Конфеты",
         icon: "https://arbuz.kz/image/s3/arbuz-kz-catalogs/225041-konfety.png?w=140&h=%h&_c=1670905863",
      });
      categories.push({
         id: 11,
         parentId: 3,
         name: "Шокодад",
         icon: "https://arbuz.kz/image/s3/arbuz-kz-catalogs/225247-shokolad_batonchiki_pasta.png?w=140&h=%h&_c=1670905869",
      });
      categories.push({
         id: 12,
         parentId: 3,
         name: "Печенье",
         icon: "https://arbuz.kz/image/s3/arbuz-kz-catalogs/225042-pechene_vafli_torty.png?w=140&h=%h&_c=1670905869",
      });
      return categories;
   }
}
