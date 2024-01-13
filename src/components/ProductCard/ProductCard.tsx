import React from "react";
import "./ProductCard.css";
import { IoCart } from "react-icons/io5";
import { Product } from "../../types/product";
import { TProduct } from "../../types/others";

interface TProps {
   product: TProduct;
}

const ProductCard: React.FC<TProps> = ({ product }) => {
   const hendler = () => {
      window.location.assign(`http://localhost:3000/products/item/${product.id}`);
   };
   


   return (
      <div className="product" onClick={hendler}>
         <img className="product_image" src={product.image} alt="" />
         <h3 className="product_name">{product.name}</h3>
         <div className="product_buy">
            <div>
               <p className="product_price_for_one">{product.price}₸/шт.</p>
               <p className="product_price">{product.price}₸</p>
            </div>
            {/* <button onClick={() => {addProductToLS}} className="product_buy_btn"><IoCart/></button> */}
         </div>
      </div>
   );
};

export default ProductCard;
