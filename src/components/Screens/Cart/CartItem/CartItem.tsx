import React from "react";
import "./CartItem.css";
import { IoClose, IoTrashOutline } from "react-icons/io5";
import { FiPlus, FiMinus } from "react-icons/fi";
import { CartService } from "../../../../services/cartService";

interface TProps {
   productId: number;
   productName: string;
   productCount: number;
   productPrice: number;
   productImage: string;
}

const CartItem: React.FC<TProps> = ({ productId, productImage, productName, productCount, productPrice }) => {
   const cartService = new CartService();

   const appendProduct = async (productId: number) => {
      await cartService.appendProduct(productId);
      window.location.reload(); // TODO: сделать по человечески
   }

   const reduceProduct = async (productId: number) => {
      await cartService.reduceProduct(productId);
      window.location.reload(); // TODO: сделать по человечески
   }

   const removeProduct = async (productId: number) => {
      await cartService.removeProduct(productId);
      window.location.reload(); // TODO: сделать по человечески
   }

   return (
      <div className="cart-item">
         <div className="cart-item__image">
            <img src={productImage} alt="" />
         </div>
         <div className="catr-item__info">
            <div className="cart-item__label">
               <a href="">{productName}</a>
            </div>
            <button onClick={() => removeProduct(productId)} className="cart-item__remove">
               <IoClose />
            </button>
            <div className="cart-item__quantity">
               <div>
                  <div className="quantity-control">
                     <button onClick={() => reduceProduct(productId)} className="quantity-control__minus">
                        {productCount < 2 ? <IoTrashOutline /> : <FiMinus/>}
                        
                     </button>
                     <div className="quantity-control__count">
                        <p>{productCount}</p>
                     </div>
                     <button onClick={() => appendProduct(productId)} className="quantity-control__plus">
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
