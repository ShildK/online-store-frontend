import { Link } from "react-router-dom";
import "./CatalogItem.css";
import { FC } from "react";
import { FRONTEND_URL } from "../../App/App";

type TProps = {
   title: string;
   icon: string;
   categoryId: number;
};

const CatalogItem: FC<TProps> = ({ title, icon, categoryId }) => {
   
   const handler = () => {
      window.location.assign(FRONTEND_URL + `/products/${categoryId}`);
   };

   return (
      <div className="catalog-item" onClick={handler}>
         <img className="catalog-item__icon" src={icon} alt="" />
         <p className="catalog-item__title">{title}</p>
      </div>
   );
};

export default CatalogItem;
