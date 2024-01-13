import React from "react";
import "./ProductCard.css";
import { IoCart } from "react-icons/io5";

interface TProps {
   image: string;
   name: string;
   price: number;
   id: number;
}

const ProductCard: React.FC<TProps> = ({ image, name, price, id }) => {
   const hendler = () => {
      window.location.assign(`http://localhost:3000/products/${id}`);
   };
   return (
      <div className="product" onClick={hendler}>
         <img className="product_image" src={image} alt="" />
         <h3 className="product_name">{name}</h3>
         <div className="product_buy">
            <div>
               <p className="product_price_for_one">{price}₸/шт.</p>
               <p className="product_price">{price}₸</p>
            </div>
            <button className="product_buy_btn"><IoCart/></button>
         </div>
      </div>
   );
};

export default ProductCard;
