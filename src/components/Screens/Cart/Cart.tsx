import React, { useEffect, useState } from "react";
import "./Cart.css";
import { PiControlLight } from "react-icons/pi";
import CartItem from "./CartItem/CartItem";
import { CartService } from "../../../services/cartService";
import { ShoppingCartItem } from "../../../types/shoppingCartItem";
import { Link } from "react-router-dom";
import { FRONTEND_URL } from "../../App/App";

const Cart: React.FC = () => {
   const [shoppingCart, setShoppingCart] = useState<ShoppingCartItem[]>([]);
   const [totalAmount, setTotalAmount] = useState<number | null>();
   const [productsCost, setProductsCost] = useState<number | null>();
   const [deliveryCost, setDeliveryCost] = useState<number | null>();

   const cartService = new CartService();

   useEffect(() => {
      (async () => {
         const shoppingCartItems: ShoppingCartItem[] =
            await cartService.getShoppingCartItems();
         setShoppingCart(shoppingCartItems);

         if (shoppingCartItems.length > 0) {
            const _productsCost = shoppingCartItems
               .map((item) => item.count * item.product.price)
               .reduce((acc, num) => acc + num, 0);
            setProductsCost(_productsCost);
            const _deliveryCost = _productsCost / 20;
            setDeliveryCost(_deliveryCost);
            setTotalAmount(_deliveryCost + _productsCost);
         }
      })();
   }, []);

   const clearShoppingCart = async () => {
      await cartService.setShoppingCartItems([]);
      setShoppingCart([]);
   };

   const orderRegistration = () => {
      window.location.href = FRONTEND_URL + `/order/decoration`;
   }

   return (
      <section>
         {shoppingCart.length > 0  ? (
            <div className="cart">
               <div className="cart__products-information">
                  <div className="cart__header">
                     <p className="cart__title">
                        Корзина: <span>{shoppingCart.length}</span> позиций
                     </p>
                     <button
                        onClick={() => clearShoppingCart()}
                        className="cart__clear-all"
                     >
                        Очистить корзину
                     </button>
                  </div>
                  <p className="cart__subtitle">Товары</p>
                  <div className="cart__items">
                     {shoppingCart ? (
                        shoppingCart.map((product) => {
                           return (
                              <CartItem
                                 key={product.product.id}
                                 productId={product.product.id}
                                 productImage={product.product.image}
                                 productName={product.product.name}
                                 productCount={product.count}
                                 productPrice={
                                    product.product.price * product.count
                                 }
                              />
                           );
                        })
                     ) : (
                        <div>Ничего нет</div>
                     )}
                  </div>
               </div>
               <div className="cart__order-information">
                  <h2 className="cart__title">Ваш заказ</h2>
                  <div className="cart__priser">
                     <p className="cart__text">Стоимость продуктов:</p>
                     <p className="cart__price">{productsCost} ₸</p>
                  </div>
                  <div className="cart__priser">
                     <p className="cart__text">Стоимость дoставки:</p>
                     <p className="cart__price">{deliveryCost} ₸</p>
                  </div>
                  <div className="cart__line"></div>
                  <div className="cart__priser">
                     <p className="cart__subtitle">Итоговая сумма</p>
                     <p className="cart__amount-price">{totalAmount} ₸</p>
                  </div>
                  <button className="cart__pricer-button" onClick={orderRegistration}>Заказать</button>
               </div>
            </div>
         ) : (
            <div className="cart-empty">
               <img className="cart-empty__image" src="https://arbuz.kz/static/platform/frontend/assets/banners/icon-package.png" alt="" />
               <h2 className="cart-empty__title">Ваша корзина пуста</h2>
               <p className="cart-empty__subtitle">Здесь будут лежать товары для покупки</p>
               <Link className="cart-empty__link" to="/home">Перейти к покупкам</Link>
            </div>
         )}
      </section>
   );
};

export default Cart;
