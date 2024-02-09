import React, { useEffect, useState } from "react";
import { IoSearchSharp, IoClose } from "react-icons/io5";
import "./ModalFiltersWindow.css";

import { ProductService } from "../../services/productService";
import { Category } from "../../types/category";
import { FilterResponse } from "../../services/models/filterResponse";
import { useParams } from "react-router-dom";
import { ProductFilter } from "../../services/models/productFilter";
import { Product } from "../../types/product";
import { TSetState } from "../../types/others";

interface TProps {
   isHovered: boolean;
   setHovered: TSetState<boolean>;
}

const ModalFiltersWindow: React.FC<TProps> = ({ isHovered, setHovered }) => {
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

   const [priceMin, setPriceMin] = useState<number>();
   const [priceMax, setPriceMax] = useState<number>();
   const productService = new ProductService();

   const [categoryName, setCategoryName] = useState<string>("");

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

      const queryParameters = new URLSearchParams(window.location.search);
      const searchText = queryParameters.get("searchText");

      if (searchText != null && searchText != "") {
         productFilter.text = searchText;
      }
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
      <div className={`modal-filters ${isHovered ? "visible" : ""}`}>
         <div className="modal-filters__close">
            <button className="modal-filters__close-btn" onClick={() => {setHovered(false)}}>
               <IoClose />
            </button>
         </div>
         <div className="filters">
            <h4>Фильтры:</h4>
            <div className="filters-input__price">
               <label htmlFor="priceMin">Цена от:</label>
               <input
                  type="number"
                  id="priceMin"
                  defaultValue={filter.priceMin}
                  onChange={(e) => setPriceMin(Number(e.target.value))}
                  min={0}
               />
            </div>
            <div className="filters-input__price">
               <label htmlFor="priceMax">Цена до:</label>
               <input
                  type="number"
                  id="priceMax"
                  defaultValue={filter.priceMax}
                  onChange={(e) => setPriceMax(Number(e.target.value))}
                  min={0}
               />
            </div>
            <div className="filters__select">
               <label htmlFor="selectBrand">Производитель:</label>
               <select
                  id="selectBrand"
                  className="select"
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
            <button className="filters__button" onClick={handlerFilter}>
               Найти
            </button>
         </div>
      </div>
   );
};

export default ModalFiltersWindow;
