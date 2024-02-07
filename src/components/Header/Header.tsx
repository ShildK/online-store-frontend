import React, { useEffect, useState } from "react";
import "./Header.css";

import { IoMenu, IoCart, IoSearchSharp } from "react-icons/io5";
import { Link } from "react-router-dom";
import ModalCategory from "../ModalCategory/ModalCategory";
import { AuthenticationService } from "../../services/authenticationService";
import { FRONTEND_URL } from "../App/App";

const Header: React.FC = () => {
   const [isHovered, setHovered] = useState<boolean>(false);
   const [searchText, setSearchText] = useState<string>("");
   const aythenticationService = new AuthenticationService();

   const user = aythenticationService.getUser();
   let isAuthorized = user !== null;

   const searchByText = async (searchText: string) => {
      window.location.assign(
         FRONTEND_URL + `/products?searchText=` + searchText
      );
   };

   const logout = () => {
      new AuthenticationService().logout();
      window.location.reload();
   };

   return (
      <div className="header">
         <div className="header__greeting">
            
            <h2 className="header__title">Лучшие товары по лучшим ценам!</h2>
         </div>
         
         <div className="header__body">
            <div className="header__content">
               <div className="header__logo">
                  <Link className="link" to="/home">
                     <img
                        className="logo"
                        src={`${process.env.PUBLIC_URL}/img/logo.png`}
                        alt=""
                     />
                  </Link>
               </div>
               <div className="header__product-search">
                  <div
                     className="header__category-modal"
                     onMouseEnter={() => setHovered(true)}
                     onMouseLeave={() => setHovered(false)}
                  >
                     <IoMenu />
                     <ModalCategory isHovered={isHovered} />
                  </div>
                  <div className="header__input-search">
                     <IoSearchSharp />
                     <input
                        type="text"
                        className="input-search"
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Название товара"
                     />
                  </div>
                  <button
                     className="header__button-search"
                     onClick={() => searchByText(searchText)}
                  >
                     ИСКАТЬ
                  </button>
               </div>
               <div className="header__buttons">
                  <button className="header__address">
                     Адрес доставки
                  </button>
                  {isAuthorized ? (
                     <button className="header__log-in" onClick={logout}>
                        Выйти
                     </button>
                  ) : (
                     <Link className="header__log-in" to="/authorization">
                        Войти
                     </Link>
                  )}

                  <Link className="header__cart-btn" to="/cart">
                     <IoCart />
                  </Link>
               </div>
            </div>
         </div>
      </div>
   );
};

export default Header;
