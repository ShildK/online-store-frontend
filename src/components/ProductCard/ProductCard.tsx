import React, { useState } from "react";
import "./ProductCard.css";
import { IoCart } from "react-icons/io5";
import { Product } from "../../types/product";
import { TProduct } from "../../types/others";
import { CartService } from "../../services/cartService";
import { FRONTEND_URL } from "../App/App";

interface TProps {
   product: TProduct;
}

const ProductCard: React.FC<TProps> = ({ product }) => {
   const [showMessage, setShowMessage] = useState<boolean>(false);

   const handler = () => {
      window.location.assign(
         FRONTEND_URL + `/products/item/${product.id}`
      );
   };

   const addProductToCart = () => {
      const addProducts = new CartService().addProduct(product);
      setShowMessage(true);

      setTimeout(() => {
         setShowMessage(false);
      }, 1000);
   };

   return (
      <div className="product">
         <div className="product__handler" onClick={handler}>
            <img className="product_image" src={product.image} alt="" />
            <h3 className="product_name">{product.name}</h3>
         </div>
         <div className="product_buy">
            <div>
               <p className="product_price_for_one">{product.price}₸/шт.</p>
               <p className="product_price">{product.price}₸</p>
            </div>
            <button onClick={addProductToCart} className="product_buy_btn">
               <IoCart />
            </button>
         </div>
         {showMessage && <p>Продукт добавлен</p>}
      </div>
   );
};

export default ProductCard;
