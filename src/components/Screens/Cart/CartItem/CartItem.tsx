import React from "react";
import "./CartItem.css";
import { IoClose, IoTrashOutline } from "react-icons/io5";
import { FiPlus, FiMinus } from "react-icons/fi";

interface TProps {
   productName: string;
   productCount: number;
   productPrice: number;
   productImage: string;
}

const CartItem: React.FC<TProps> = ({ productImage, productName, productCount, productPrice }) => {
   return (
      <div className="cart-item">
         <div className="cart-item__image">
            <img src={productImage} alt="" />
         </div>
         <div className="catr-item__info">
            <div className="cart-item__label">
               <a href="">{productName}</a>
            </div>
            <button className="cart-item__remove">
               <IoClose />
            </button>
            <div className="cart-item__quantity">
               <div>
                  <div className="quantity-control">
                     <button className="quantity-control__minus">
                        {productCount < 2 ? <IoTrashOutline /> : <FiMinus/>}
                        
                     </button>
                     <div className="quantity-control__count">
                        <p>{productCount}</p>
                     </div>
                     <button className="quantity-control__plus">
                        <FiPlus />
                     </button>
                  </div>
               </div>
            </div>
            <div className="cart-item__price">
                <p>{productPrice} ₸</p>
            </div>
         </div>
      </div>
   );
};

export default CartItem;