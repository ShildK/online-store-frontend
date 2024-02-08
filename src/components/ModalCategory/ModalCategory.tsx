import React, { useEffect, useState } from "react";
import { IoSearchSharp, IoClose } from "react-icons/io5";
import "./ModalCategory.css";

import { Link } from "react-router-dom";
import { ProductService } from "../../services/productService";
import { Category } from "../../types/category";
import { FRONTEND_URL } from "../App/App";

interface TProps {
   isHovered: boolean;
}

const ModalCategory: React.FC<TProps> = ({ isHovered }) => {
   const [hoveredId, setHoveredId] = useState<number>(0);
   const [categories, setCategories] = useState<Category[]>([]);

   const [searchText, setSearchText] = useState<string>("");

   useEffect(() => {
      (async () => {
         const categories = await new ProductService().getCategories();
         setCategories(categories);
      })();
   }, []);

   useEffect(() => {
      console.log(hoveredId);
   }, [hoveredId]);

   console.log(categories);

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
               onMouseLeave={() => setHoveredId(0)}
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

               <ul>
                  {hoveredId === category.id && renderSubCategory(category.id)}
               </ul>
            </li>
         ));
   };

   const renderSubCategory = (categoryId: number) => {
      return categories
         .filter((category) => category.parentId === categoryId)
         .map((category) => (
            <Link
               className="subcategory"
               to={`/products/${category.id}`}
               key={category.id}
            >
               <p>{category.name}</p>
            </Link>
         ));
   };

   return (
      <div className={`modal ${isHovered ? "visible" : ""}`}>
         <div className="modal__close">
            <button className="modal__close-btn">
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

                  {/* <li className="category">
                  <div className="fruts">
                     <LuApple />
                  </div>
                  <Link className="categories__link" to="/products/categiryId">
                     Свежие овощи и фрукты
                  </Link>
               </li>
               <li className="category">
                  <div className="milk">
                     <LuMilk />
                  </div>
                  <Link className="categories__link" to="/products/categiryId">
                     Молоко, сыр, масло, яйца
                  </Link>
               </li>
               <li className="category">
                  <div className="sausage">
                     <TbSausage />
                  </div>
                  <Link className="categories__link" to="/products/categiryId">
                     Колбасы
                  </Link>
               </li>
               <li className="category">
                  <div className="meat">
                     <TbMeat />
                  </div>
                  <Link className="categories__link" to="/products/categiryId">
                     Мясо, птица
                  </Link>
               </li>
               <li className="category">
                  <div className="cereal">
                     <CiWheat />
                  </div>
                  <Link className="categories__link" to="/products/categiryId">
                     Крупы, консервы, снеки
                  </Link>
               </li>
               <li className="category">
                  <div className="fish">
                     <LuFish />
                  </div>
                  <Link className="categories__link" to="/products/categiryId">
                     Рыба и морепродукты
                  </Link>
               </li>
               <li className="category">
                  <div className="candy">
                     <LuCandy />
                  </div>
                  <Link className="categories__link" to="/products/categiryId">
                     Сладости
                  </Link>
               </li>
               <li className="category">
                  <div className="beauty">
                     <LuFlower />
                  </div>
                  <Link className="categories__link" to="/products/categiryId">
                     Красота
                  </Link>
               </li> */}
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
