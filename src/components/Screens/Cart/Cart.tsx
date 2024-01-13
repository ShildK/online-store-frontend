import React from "react";
import "./Cart.css";
import { PiControlLight } from "react-icons/pi";
import CartItem from "./CartItem/CartItem";
import { products } from "../../../services/mock/products";

const Cart: React.FC = () => {
   const productCount = 3;
   const deliveryCost = 700;
   const productsCost = 2455;
   const totalAmount = 3155;
   return (
      <section>
         <div className="cart">
            <div className="cart__products-information">
               <div className="cart__header">
                  <p className="cart__title">
                     Корзина: <span>{productCount}</span>
                  </p>
                  <button className="cart__clear-all">Очистить корзину</button>
               </div>
               <p className="cart__subtitle">Товары</p>
               <div>
                  {products.map((product) => {
                     if (product.id < 7) {
                        return (
                           <CartItem
                              key={product.id}
                              productImage={product.image}
                              productName={product.name}
                              productCount={3}
                              productPrice={product.price * 3}
                           />
                        );
                     }
                  })}
               </div>
            </div>
            <div className="cart__order-information">
               <h2 className="cart__title">Ваш заказ</h2>
               <div className="cart__priser">
                  <p className="cart__text">Стоимость продуктов:</p>
                  <p className="cart__price">{productsCost} ₸</p>
               </div>
               <div className="cart__priser">
                  <p className="cart__text">Стоимость длставки:</p>
                  <p className="cart__price">{deliveryCost} ₸</p>
               </div>
               <div className="cart__line"></div>
               <div className="cart__priser">
                  <p className="cart__subtitle">Итоговая сумма</p>
                  <p className="cart__amount-price">{totalAmount} ₸</p>
               </div>
               <button className="cart__pricer-button">Заказать</button>
            </div>
         </div>
      </section>
   );
};

export default Cart;
