import React, { useEffect, useState } from "react";
import Container from "../../Container/Container";
import "./OrderRegistration.css";
import { CartService } from "../../../services/cartService";
import { ShoppingCartItem } from "../../../types/shoppingCartItem";
import { Link } from "react-router-dom";

const OrderRegistration: React.FC = () => {
   const [shoppingCart, setShoppingCart] = useState<ShoppingCartItem[]>([]);
   const [totalAmount, setTotalAmount] = useState<number | null>();
   const [productsCost, setProductsCost] = useState<number | null>();
   const [deliveryCost, setDeliveryCost] = useState<number | null>();

   const [userName, setUserName] = useState<string>("");
   const [address, setAddress] = useState<string>("");
   const [dateDay, setDateDay] = useState<string>("");
   const [dateTime, setDateTime] = useState<string>("");

   const [success, setSuccess] = useState<boolean>(false);

   const cartService = new CartService();

   const timesForDelivery = [
      { id: 1, timeTitle: "7:00-10:00", timeValue: "value1" },
      { id: 2, timeTitle: "10:00-13:00", timeValue: "value2" },
      { id: 3, timeTitle: "13:00-16:00", timeValue: "value3" },
      { id: 4, timeTitle: "16:00-19:00", timeValue: "value4" },
      { id: 5, timeTitle: "19:00-21:00", timeValue: "value5" },
      { id: 6, timeTitle: "21:00-23:45", timeValue: "value6" },
   ];

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
   }, [success, shoppingCart]);

   const handlerSubmit = () => {
      debugger;
      if (userName && address && dateDay && dateTime) {
         setSuccess(true);
         clearState();
         clearShoppingCart();
      }
   };

   const clearShoppingCart = async () => {
      await cartService.setShoppingCartItems([]);
      setShoppingCart([]);
   };

   const clearState = () => {
      setUserName("");
      setAddress("");
   };

   return (
      <Container>
         {success && shoppingCart.length < 1 ? (
            <section>
               <div className="order-is-made">
                  <Link to="/home">
                     <img
                        src={`${process.env.PUBLIC_URL}/img/logo.png`}
                        alt=""
                     />
                  </Link>
                  <h2 className="title">Заказ оформлен</h2>
                  <p className="text">Ожидайте доставку {dateDay}</p>
                  {timesForDelivery.map((time) => {
                     if (time.timeValue === dateTime) {
                        return (
                           <p className="text">
                              Примерное время доставки {time.timeTitle}
                           </p>
                        );
                     }
                  })}

                  <h3 className="subtitle">Спасибо за заказ!</h3>
                  <Link className="order-is-made__link" to="/cart">
                     Вернуться
                  </Link>
               </div>
            </section>
         ) : (
            <section>
               <div className="order-registration">
                  <Link to="/home">
                     <img
                        src={`${process.env.PUBLIC_URL}/img/logo.png`}
                        alt=""
                     />
                  </Link>
                  <h2 className="order-registration__title">
                     Оформление заказа
                  </h2>
                  <form className="order-registration__form">
                     <input
                        type="text"
                        placeholder="Имя"
                        className="order-registration__form-input"
                        onChange={(e) => {
                           setUserName(e.target.value);
                        }}
                     />
                     <input
                        type="text"
                        placeholder="Адрес"
                        className="order-registration__form-input"
                        onChange={(e) => {
                           setAddress(e.target.value);
                        }}
                     />
                     <div className="form__date">
                        <p>Выберите день и время доставки</p>
                        <input
                           type="date"
                           className="form__date-day"
                           min="2024-02-10"
                           max="2024-02-12"
                           defaultValue="2024-02-10"
                           onChange={(e) => {
                              setDateDay(e.target.value);
                           }}
                        />
                        <select
                           className="form__date-time"
                           defaultValue="Выберите время"
                           onChange={(e) => {
                              setDateTime(e.target.value);
                           }}
                        >
                           <option disabled value=""></option>
                           {timesForDelivery.map((time) => {
                              return (
                                 <option key={time.id} value={time.timeValue}>
                                    {time.timeTitle}
                                 </option>
                              );
                           })}
                        </select>
                     </div>
                     <div className="form__order-information">
                        <p className="form__order-information__text">
                           Сумма заказа, с учетом доставки:
                        </p>
                        <p className="form__order-information__price">
                           {totalAmount} ₸
                        </p>
                     </div>
                     <button
                        onClick={handlerSubmit}
                        disabled={!(userName && address && dateDay && dateTime)}
                        className={
                           userName && address && dateDay && dateTime
                              ? "form__button active"
                              : "form__button disabled"
                        }
                     >
                        Заказать
                     </button>
                  </form>
                  <Link className="order-registration__link" to="/cart">
                     Вернуться
                  </Link>
               </div>
            </section>
         )}
      </Container>
   );
};

export default OrderRegistration;
