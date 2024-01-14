import React, { useEffect, useState } from "react";
import "./ModalCategory.css";

import { Link } from "react-router-dom";
import { ProductService } from "../../services/productService";
import { Category } from "../../types/category";

interface TProps {
   isHovered: boolean;
}

const ModalCategory: React.FC<TProps> = ({ isHovered }) => {
   const [hoveredId, setHoveredId] = useState<number>(0);
   const [categories, setCategories] = useState<Category[]>([])
   
   useEffect(() => {
      (async()=> {
         const categories = await new ProductService().getCategories();
         setCategories(categories)
      })()
   },[]);

   
   console.log(categories);

   const handleMouseEnter = (id: number) => {
      setHoveredId(id);
      console.log(id);
   };

   return (
      <div className={`modal ${isHovered ? "visible" : ""}`}>
         <div className="categories">
            <div className="categories__names">
               <ul className="categories__list">
                  {categories.map((category) => {
                     if (category.parentId === undefined) {
                        return (
                           <li
                              className="category"
                              key={category.id}
                              onMouseEnter={() => handleMouseEnter(category.id)}
                              //    onMouseLeave={() => setHoveredId(null)}
                           >
                              <div>
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
               <ul className="subcategorues__list">
                  {categories.map((category) => {
                     if (hoveredId == category.parentId) {
                        return (
                           <Link to={`/products/${category.id}`}>
                              <li className="subcategory" key={category.id}>
                                 <img src={category.icon} alt="" />
                                 <p>{category.name}</p>
                              </li>{" "}
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
