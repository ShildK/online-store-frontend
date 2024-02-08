import React, { useEffect, useState } from "react";
import "./Home.css";

import ProductListWithTitle from "../../ProductListWithTitle/ProductListWithTitle";
import Catalogs from "../../Catalogs/Catalogs";
import { ProductService } from "../../../services/productService";
import { ProductFilter } from "../../../services/models/productFilter";
import { Product } from "../../../types/product";

const Home: React.FC = () => {
   const productService = new ProductService();
   const [hits, setHits] = useState<Product[]>([]);
   const [forYou, setForYou] = useState<Product[]>([]);
   const [newProducts, setNewProducts] = useState<Product[]>([]);

   useEffect(() => {
      (async () => {
         const _hits = await productService.getProducts({
            priceFrom: 2100,
            priceTo: undefined,
            categoryId: undefined,
            brand: undefined,
            orderBy: "PriceDESC",
            limit: 6,
            pageNumber: 1,
            text: undefined,
         });
         setHits(_hits.products);
         const _forYou = await productService.getProducts({
            priceFrom: 1000,
            priceTo: undefined,
            categoryId: undefined,
            brand: undefined,
            orderBy: "PriceASC",
            limit: 6,
            pageNumber: 1,
            text: undefined,
         });
         setForYou(_forYou.products);
         const _newProducts = await productService.getProducts({
            priceFrom: undefined,
            priceTo: undefined,
            categoryId: undefined,
            brand: undefined,
            orderBy: "PriceASC",
            limit: 6,
            pageNumber: 1,
            text: undefined,
         });
         setNewProducts(_newProducts.products);
      })();
   }, []);

   return (
      <div className="home">
         <div className="home__carusel">
            <img src="./img/image-1.jpg" alt="" />
         </div>
         <div className="home__products-recommendations">
            <ProductListWithTitle title="Хиты продаж" products={hits} />
            <ProductListWithTitle title="Новинки" products={newProducts} />
            <ProductListWithTitle title="Для Вас" products={forYou} />
         </div>
         <Catalogs />
      </div>
   );
};
export default Home;
