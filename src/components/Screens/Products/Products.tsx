import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import "./Products.css";

import ProductCard from "../../ProductCard/ProductCard";
import { ProductService } from "../../../services/productService";
import { ProductFilter } from "../../../services/models/productFilter";
import { OrderType } from "../../../services/enum/orderType";

const Products: React.FC = () => {
   const { categoryId } = useParams();
   const [selectValueByPrice, setSelectValueByPrice] = useState<string>("");
   const [selectValueByBrand, setSelectValueByBrand] = useState<string>("");

   const [priseASC, setPriceASC] = useState<string>()
   const [priseDESC, setPriceDESC] = useState<string>()
   const productService = new ProductService();
   
   let productFilter = new ProductFilter();
   productFilter.categoryId =
   categoryId !== undefined ? Number(categoryId) : undefined;
   
   const categories = productService.getCategories();
   const productResponse = productService.getProducts(productFilter);
   const filter = productService.getFilter(productFilter.categoryId);
   
   let categoryName = "Все продукты";
   if (productFilter.categoryId !== undefined) {
      let category = categories.find((c) => c.id === productFilter.categoryId);
      if (category !== undefined) {
         categoryName = category.name;
      }
   }
   
   useEffect(() => {
      console.log(selectValueByBrand);
      console.log(selectValueByPrice);
      
   // OrderType
      
      
   }, [selectValueByPrice, selectValueByBrand])

   return (
      <section className="products">
         <div className="products__header">
            <h2>{categoryName}</h2>
            <select
               className="filter-select"
               defaultValue="Выберите из списка"
               onChange={(e) => setSelectValueByPrice(e.target.value)}
            >
               <option disabled value="">
                  Выберите из списка
               </option>
               <option value="priceASC">По возрастанию цены</option>
               <option value="priceDESC">По убыванию цены</option>
            </select>
         </div>
         <div className="products__content">
            <div className="products__filter">
               <h4>Фильтры:</h4>
               <div className="input-price-min filter-input">
                  <label htmlFor="priceASC">Цена от:</label>
                  <input type="number" id="priceASC" onChange={(e) => setPriceASC(e.target.value)} min={0}/>
               </div>
               <div className="input-price-max filter-input">
                  <label htmlFor="priceDESC">Цена до:</label>
                  <input type="number" id="priceDESC" onChange={(e) => setPriceDESC(e.target.value)} min={0}/>
               </div>
               <div className="product__filter-select">
                  <label htmlFor="selectBrand">Производитель:</label>
                  <select id="selectBrand"className="filter-select" defaultValue="Выберите из списка"
               onChange={(e) => setSelectValueByBrand(e.target.value)}>
                  <option value="">Выберите из списка</option>
                  {filter.brands.map((brand) => {
                     return <option value={brand} key={brand}>{brand}</option>;
                  })}
               </select>
               </div>
               
            </div>
            <div className="products__items">
               {productResponse.products.map((product) => {
                  return (
                     <ProductCard
                        key={product.id}
                        product={product}
                     />
                  );
               })}
            </div>
         </div>
      </section>
   );
};

export default Products;
