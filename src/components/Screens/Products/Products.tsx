import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Products.css";

import ProductCard from "../../ProductCard/ProductCard";
import { ProductService } from "../../../services/productService";
import { ProductFilter } from "../../../services/models/productFilter";
import { Category } from "../../../types/category";
import { ProductResponse } from "../../../services/models/productResponse";
import { FilterResponse } from "../../../services/models/filterResponse";
import { Product } from "../../../types/product";
import { log } from "console";

const Products: React.FC = () => {
   const { categoryId } = useParams();
   const [orderBy, setOrderBy] = useState<string>("PriceASC");
   const [brandFilter, setBrandFilter] = useState<string>("");
   useState<string>("Все продукты");

   const [categories, setCategories] = useState<Category[]>([]);
   const [products, setProducts] = useState<Product[]>([]);
   const [filter, setFilter] = useState<FilterResponse>({
      priceMin: undefined,
      priceMax: undefined,
      brands: [],
   });

   const [categoryName, setCategoryName] = useState<string>("");

   const [priceMin, setPriceMin] = useState<number>();
   const [priceMax, setPriceMax] = useState<number>();
   const productService = new ProductService();

   const _categoryId = categoryId != undefined ? Number(categoryId) : undefined;

   useEffect(() => {
      (async () => {
         await updateCategories();
         await updateProducts();
         await updateFilter();
      })();
   }, [categoryId, orderBy]);

   const updateProducts = async () => {
      let productFilter = new ProductFilter();
      productFilter.categoryId = _categoryId;

      if (priceMin != undefined) {
         productFilter.priceFrom = priceMin;
      }
      if (priceMax != undefined) {
         productFilter.priceTo = priceMax;
      }
      if (brandFilter != "Выберите из списка") {
         productFilter.brand = brandFilter;
      }
      if (orderBy != undefined) {
         productFilter.orderBy = orderBy;
      }

      const productResponse = await productService.getProducts(productFilter);

      setProducts(productResponse.products);
   };

   const updateCategories = async () => {
      const categories = await productService.getCategories();
      if (_categoryId !== undefined) {
         let category = categories.find((c) => c.id === _categoryId);
         if (category !== undefined) {
            setCategoryName(category.name);
         }
      }
      setCategories(categories);
   };

   const updateFilter = async () => {
      const filter = await productService.getFilter(_categoryId);
      setFilter(filter);
   };

   const handlerFilter = async () => {
      await updateProducts();
   };

   return (
      <section className="products">
         <div className="products__header">
            <h2>{categoryName}</h2>
            <select
               className="filter-select"
               defaultValue="Выберите из списка"
               onChange={(e) => setOrderBy(e.target.value)}
            >
               <option disabled value="">
                  Выберите из списка
               </option>
               <option value="PriceASC">По возрастанию цены</option>
               <option value="PriceDESC">По убыванию цены</option>
            </select>
         </div>
         <div className="products__content">
            <div className="products__filter">
               <h4>Фильтры:</h4>
               <div className="input-price-min filter-input">
                  <label htmlFor="priceMin">Цена от:</label>
                  <input
                     type="number"
                     id="priceMin"
                     defaultValue={filter.priceMin}
                     onChange={(e) => setPriceMin(Number(e.target.value))}
                     min={0}
                  />
               </div>
               <div className="input-price-max filter-input">
                  <label htmlFor="priceMax">Цена до:</label>
                  <input
                     type="number"
                     id="priceMax"
                     defaultValue={filter.priceMax}
                     onChange={(e) => setPriceMax(Number(e.target.value))}
                     min={0}
                  />
               </div>
               <div className="product__filter-select">
                  <label htmlFor="selectBrand">Производитель:</label>
                  <select
                     id="selectBrand"
                     className="filter-select"
                     defaultValue="Выберите из списка"
                     onChange={(e) => setBrandFilter(e.target.value)}
                  >
                     <option value="">Выберите из списка</option>
                     {filter.brands.map((brand) => {
                        return (
                           <option value={brand} key={brand}>
                              {brand}
                           </option>
                        );
                     })}
                  </select>
               </div>
               <button onClick={handlerFilter}>Найти</button>
            </div>
            <div className="products__items">
               {products.map((product) => {
                  return <ProductCard key={product.id} product={product} />;
               })}
            </div>
         </div>
      </section>
   );
};

export default Products;
