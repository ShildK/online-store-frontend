import React, { useState, useEffect, useRef } from "react";
import "./Authorization.css";
import Container from "../../Container/Container";
import InputBlock from "../Registration/InputBlock/InputBlock";
import { Link } from "react-router-dom";
import { AuthenticationService } from "../../../services/authenticationService";
import { FRONTEND_URL } from "../../App/App";

const Authorization: React.FC = () => {
   const userRef = useRef<HTMLInputElement | null>(null);
   const errRef = useRef<HTMLParagraphElement | null>(null);

   const [email, setEmail] = useState<string>("");
   const [password, setPassword] = useState<string>("");
   const [errorMessage, setErrorMessage] = useState<string>("");
   const [success, setSuccess] = useState<boolean>(false);

   useEffect(() => {
      userRef.current?.focus();
   }, []);

   useEffect(() => {
      setErrorMessage("");
   }, [email, password]);

   const handlerSubmit = async (e: React.ChangeEvent<any>) => {
      e.preventDefault();
      let user = await new AuthenticationService().login(email, password);
      if (user != null) {
         setEmail("");
         setPassword("");
         setSuccess(true);
      }
   };
   const login = () => {
      window.location.reload();
      window.location.assign(FRONTEND_URL + `/home`);
   };
   return (
      <Container>
         {success ? (
            <section>
               <div className="success-message">
                  <div onClick={login}>
                     <h2 className="authorization__title">Вы авторизованы</h2>
                     <Link className="link" to="/home">
                        Перейти на главную страницу
                     </Link>
                  </div>
               </div>
            </section>
         ) : (
            <section>
               <div className="authorization">
                  <p
                     ref={errRef}
                     className={errorMessage ? "error-message" : "offscreen"}
                     aria-live="assertive"
                  >
                     {errorMessage}
                  </p>
                  <div className="authorization__body">
                     <Link to="/home">
                        <img
                           src={`${process.env.PUBLIC_URL}/img/logo.png`}
                           alt=""
                        />
                     </Link>

                     <h2 className="authorization__title">
                        Приветствуем в <span>"Happy Famaely"</span>!
                     </h2>
                     <p className="authorization__subtitle">Авторизируйтесь</p>

                     <form
                        onSubmit={handlerSubmit}
                        className="authorization__form"
                     >
                        <input
                           className="authorization__input"
                           type="text"
                           autoComplete="off"
                           onChange={(e) => setEmail(e.target.value)}
                           value={email}
                           required
                        />
                        <input
                           className="authorization__input"
                           type="password"
                           autoComplete="off"
                           onChange={(e) => setPassword(e.target.value)}
                           value={password}
                           required
                        />

                        <button
                           className={
                              email && password
                                 ? "authorization__button active"
                                 : "authorization__button disabled"
                           }
                           disabled={!email || !password ? true : false}
                        >
                           Войти
                        </button>
                     </form>
                     <p className="authorization__to-registration">
                        Если Вы еще не зарегистрированны, перейдите по ссылке:
                     </p>
                     <Link className="link" to="/registration">
                        Зарегистрироваться
                     </Link>
                  </div>
               </div>
            </section>
         )}
      </Container>
   );
};

export default Authorization;
