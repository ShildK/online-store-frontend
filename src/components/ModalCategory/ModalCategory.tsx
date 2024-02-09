import React, { useEffect, useState } from "react";
import { IoSearchSharp, IoClose } from "react-icons/io5";
import "./ModalCategory.css";

import { Link } from "react-router-dom";
import { ProductService } from "../../services/productService";
import { Category } from "../../types/category";
import { FRONTEND_URL } from "../App/App";
import { TSetState } from "../../types/others";

interface TProps {
   isHovered: boolean;
   setHovered: TSetState<boolean>;
}

const ModalCategory: React.FC<TProps> = ({ isHovered, setHovered }) => {
   const [hoveredId, setHoveredId] = useState<number>(0);
   const [categories, setCategories] = useState<Category[]>([]);

   const [searchText, setSearchText] = useState<string>("");

   useEffect(() => {
      (async () => {
         const categories = await new ProductService().getCategories();
         setCategories(categories);
      })();
   }, []);

   const handleMouseEnter = (id: number) => {
      setHoveredId(id);
      console.log(id);
   };

   const searchByText = async (searchText: string) => {
      window.location.assign(
         FRONTEND_URL + `/products?searchText=` + searchText
      );
   };

   const renderCategories = (parentId = null) => {
      return categories
         .filter((category) => category.parentId === parentId)
         .map((category) => (
            <li
               className="category"
               key={category.id}
               onMouseEnter={() => handleMouseEnter(category.id)}
               // onMouseLeave={() => setHoveredId(0)}
            >
               <div className="category__parent">
                  {category.parentId === null && (
                     <div>
                        <img src={category.icon} alt="" />
                     </div>
                  )}
                  <Link
                     className="categories__link"
                     to={`/products/${category.id}`}
                  >
                     {category.name}
                  </Link>
               </div>

               <ul className="categories__children">
                  {hoveredId === category.id && renderSubCategory(category.id)}
               </ul>
            </li>
         ));
   };

   const renderSubCategory = (categoryId: number) => {
      return categories
         .filter((category) => category.parentId === categoryId)
         .map((category) => (
            <div className="subcategory__item">
               <img src={category.icon} alt="" />
               <Link
                  className="subcategory"
                  to={`/products/${category.id}`}
                  key={category.id}
                  onClick={() => {
                     setHovered(false);
                  }}
               >
                  <p>{category.name}</p>
               </Link>
            </div>
         ));
   };

   return (
      <div className={`modal ${isHovered ? "visible" : ""}`}>
         <div className="modal__close">
            <button
               onClick={() => {
                  setHovered(false);
               }}
               className="modal__close-btn"
            >
               <IoClose />
            </button>
         </div>
         <div className="modal__search-product">
            <div className="modal__input-search">
               <IoSearchSharp />
               <input
                  type="text"
                  className="input-search"
                  onChange={(e) => setSearchText(e.target.value)}
                  placeholder="Название товара"
               />
            </div>
            <button
               className="modal__button-search"
               onClick={() => searchByText(searchText)}
            >
               ИСКАТЬ
            </button>
         </div>
         <div className="categories">
            <div className="categories__names">
               <div className="modal__phone">{renderCategories()}</div>
               <ul className="categories__list">
                  {categories.map((category) => {
                     if (category.parentId === null) {
                        return (
                           <li
                              className="category"
                              key={category.id}
                              onMouseEnter={() => handleMouseEnter(category.id)}
                           >
                              <div className="category__image">
                                 <img src={category.icon} alt="" />
                              </div>
                              <Link
                                 className="categories__link"
                                 to={`/products/${category.id}`}
                              >
                                 {category.name}
                              </Link>
                           </li>
                        );
                     }
                  })}
               </ul>
            </div>
            <div className="subcategories__names">
               <ul className="subcategories__list">
                  {categories.map((category) => {
                     if (hoveredId == category.parentId && hoveredId !== null) {
                        return (
                           <Link
                              to={`/products/${category.id}`}
                              key={category.id}
                           >
                              <li className="subcategory" key={category.id}>
                                 <img src={category.icon} alt="" />
                                 <p>{category.name}</p>
                              </li>
                           </Link>
                        );
                     }
                  })}
               </ul>
            </div>
         </div>
      </div>
   );
};

export default ModalCategory;
