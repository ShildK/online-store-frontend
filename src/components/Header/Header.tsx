import React, { useState } from "react";
import "./Header.css";

import { IoMenu, IoCart, IoSearchSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import ModalCategory from "../ModalCategory/ModalCategory";
import { AuthenticationService } from "../../services/authenticationService";

const Header: React.FC = () => {
   const [isHovered, setHovered] = useState<boolean>(false);
   const aythenticationService = new AuthenticationService()

   const user = aythenticationService.getUser();
   let isAuthorized = user !== null;

   // const logout = aythenticationService.logout()

   return (
      <div className="header">
         <h2 className="title">Лучшие товары по лучшим ценам!</h2>
         <div className="header_content">
            <Link className="link" to="/home">
               <img
                  className="logo"
                  src={`${process.env.PUBLIC_URL}/img/logo.png`}
                  alt=""
               />
            </Link>
            <div className="header_search">
               <div
                  className="category_modal"
                  onMouseEnter={() => setHovered(true)}
                  onMouseLeave={() => setHovered(false)}
               >
                  <IoMenu />
                  <ModalCategory isHovered={isHovered} />
               </div>
               <div className="input_search">
                  <IoSearchSharp />
                  <input
                     type="text"
                     className="search_product"
                     placeholder="Начните вводить название товара"
                  />
               </div>
            </div>

            <button className="address">Укажите адрес доставки</button>
            <div className="buttons">
               {isAuthorized ? (
                  <button className="log_in" onClick={() => {}}>
                     Выйти
                  </button>
               ) : (
                  <Link className="log_in" to="/authorization">
                     Войти
                  </Link>
               )}

               <Link className="basket_btn" to="/cart">
                  <IoCart />
               </Link>
            </div>
         </div>
      </div>
   );
};

export default Header;
