import React from "react";
import "./Home.css";

import ProductListWithTitle from "../../ProductListWithTitle/ProductListWithTitle";
import Catalogs from "../../Catalogs/Catalogs";

const Home: React.FC = () => {
   return (
      <div className="home">
         <div className="home__carusel"></div>
         <div className="home__navigation">
            <div className="home__navigation-block"></div>
            <div className="home__navigation-block"></div>
         </div>
         <div className="home__products-recommendations">
            <ProductListWithTitle title="Хиты продаж" />
            <ProductListWithTitle title="Новинки" />
            <ProductListWithTitle title="Сладкие подарки" />
         </div>
         <Catalogs />
      </div>
   );
};
export default Home;
