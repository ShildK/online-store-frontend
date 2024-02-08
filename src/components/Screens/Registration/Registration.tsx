import React from "react";
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
   faCheck,
   faTimes,
   faInfoCircle,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./Registration.css";

import axios from "../../../api/axios";
import Container from "../../Container/Container";
import InputBlock from "./InputBlock/InputBlock";
import { AuthenticationService } from "../../../services/authenticationService";
import { RegisterRequest } from "../../../services/models/registerRequest";

const USER_REGEX = /^[a-zA-Z][a-zA-Z0-9-_]{2,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{6,24}$/;
const EMAIL_REGEX =
   /^([a-z0-9_-]+\.)*[a-z0-9_-]+@[a-z0-9_-]+(\.[a-z0-9_-]+)*\.[a-z]{2,6}$/;
const REGISTER_URL = "/auth/registration";

const Registration: React.FC = (props) => {
   const userRef = useRef<HTMLInputElement | null>(null);
   const errRef = useRef<HTMLParagraphElement | null>(null);

   const [userName, setUserName] = useState<string>("");
   const [validUserName, setValidUserName] = useState<boolean>(false);
   const [userNameFocus, setUserNameFocus] = useState<boolean>(false);

   const [email, setEmail] = useState<string>("");
   const [validEmail, setValidEmail] = useState<boolean>(false);
   const [emailFocus, setEmailFocus] = useState<boolean>(false);

   const [password, setPassword] = useState<string>("");
   const [validPassword, setValidPassword] = useState<boolean>(false);
   const [passwordFocus, setPasswordFocus] = useState<boolean>(false);

   const [matchPassword, setMatchPassword] = useState<string>("");
   const [validMatchPassword, setValidMatchPassword] = useState<boolean>(false);
   const [matchPasswordFocus, setMatchPasswordFocus] = useState<boolean>(false);

   const [errorMessage, setErrorMessage] = useState<string>("");
   const [success, setSuccess] = useState<boolean>(false);

   const [user, setUser] = useState<object>();

   useEffect(() => {
      userRef.current?.focus();
   }, []);

   useEffect(() => {
      const result = USER_REGEX.test(userName);
      setValidUserName(result);
   }, [userName]);

   useEffect(() => {
      const result = EMAIL_REGEX.test(email);
      setValidEmail(result);
   }, [email]);

   useEffect(() => {
      const result = PWD_REGEX.test(password);
      setValidPassword(result);

      const match = password === matchPassword;
      setValidMatchPassword(match);
   }, [password, matchPassword]);

   useEffect(() => {
      setErrorMessage("");
   }, [user, password, matchPassword, email]);

   const addNewUser = () => {
      if (userName && email && password) {
         if (password === matchPassword) {
            setUser({ userName, email, password });
         }
      }
   };

   const handlerSubmit = async (e: React.ChangeEvent<any>) => {
      e.preventDefault();
      const v1 = USER_REGEX.test(userName);
      const v2 = EMAIL_REGEX.test(email);
      const v3 = PWD_REGEX.test(password);
      if (!v1 || !v2 || !v3) {
         setErrorMessage("Неверно введены данные");
         return;
      }
      try {
         const registerRequest = new RegisterRequest();
         registerRequest.mail = email
         registerRequest.name = userName
         registerRequest.password = password
         const register = await new AuthenticationService().register(registerRequest)
         if(register == true){
            setSuccess(true);
            setUserName("");
            setEmail("");
            setPassword("");
            setMatchPassword("");
         }
         else {
            setErrorMessage("Ошибка регистрации")
         }
         // const response = await axios.post(
         //    REGISTER_URL,
         //    JSON.stringify({ userName, email, password }),
         //    {
         //       headers: { "Content-Type": "application/json" },
         //       withCredentials: true,
         //    }
         // );
         // console.log(response.data);
         //  console.log(response.accessToken);
         // console.log(JSON.stringify(response));

      } catch (err) {
         // if(!err?.response){
         //   setErrorMessage("Нет ответа от сервера")
         // }
         // else if(err.response?.status === 409){
         //   setErrorMessage("Токен имени пользователя")
         // }
         // else{
         //   setErrorMessage("Ошибка регистрации")
         // }
         //   errRef.current?.focus()
      }
   };

   return (
      <Container>
         {success ? (
            <section>
               <div className="success-message">
                  <h2 className="registration__title">Вы зарегистрированны</h2>
                  <Link className="link" to="/auth/authorization">
                     Ввойти
                  </Link>
               </div>
            </section>
         ) : (
            <section>
               <div className="registration">
                  <p
                     ref={errRef}
                     className={errorMessage ? "error-message" : "offscreen"}
                     aria-live="assertive"
                  >
                     {errorMessage}
                  </p>
                  <div className="registration__body">
                     <Link className="link" to="/home">
                        <img
                           src={`${process.env.PUBLIC_URL}/img/logo.png`}
                           alt=""
                        />
                     </Link>

                     <h2 className="registration__title">
                        Добро пожаловать в <span>"Happy Famaely"</span>!
                     </h2>
                     <p className="registration__subtitle">
                        Введите Ваши данные для продолжения
                     </p>
                     <form
                        onSubmit={handlerSubmit}
                        className="registration__form"
                     >
                        <div>
                           <div className="block__input">
                              <input
                                 type="text"
                                 ref={userRef}
                                 placeholder="Ваше имя:"
                                 autoComplete="off"
                                 onChange={(e) => {
                                    setUserName(e.target.value);
                                 }}
                                 required
                                 aria-invalid={validUserName ? "false" : "true"}
                                 aria-describedby="uidnote"
                                 onFocus={() => setUserNameFocus(true)}
                                 onBlur={() => setUserNameFocus(false)}
                                 className={
                                    validUserName || !userName
                                       ? "registration__input"
                                       : "registration__input red"
                                 }
                              />
                              <span
                                 className={validUserName ? "valid" : "hide"}
                              >
                                 <FontAwesomeIcon icon={faCheck} />
                              </span>
                              <span
                                 className={
                                    validUserName || !userName
                                       ? "hide"
                                       : "invalid"
                                 }
                              >
                                 <FontAwesomeIcon icon={faTimes} />
                              </span>
                           </div>
                           <p
                              id="uidnote"
                              className={
                                 userNameFocus && userName && !validUserName
                                    ? "instructions"
                                    : "offscreen"
                              }
                           >
                              <FontAwesomeIcon icon={faInfoCircle} />
                              От 4 до 24 символов.
                              <br />
                              Должно начинаться с буквы.
                              <br />
                              Допускаются буквы, цифры, подчеркивания, дефисы
                           </p>
                        </div>
                        <InputBlock
                           type="text"
                           errorMessage="Введеное Вами не может быть emailпример: «happy_famealy@gmail.com»"
                           placeholder="Email"
                           setInputState={setEmail}
                           valid={validEmail}
                           inputState={email}
                           inputFocus={emailFocus}
                           setInputFocus={setEmailFocus}
                           ariaDescribedby="uidnote"
                        />

                        <InputBlock
                           type="password"
                           errorMessage="От 6 до 24 символа.
                     Должны содержать заглавные и строчные буквы, цифру и специальный символ. Разрешенные специальные символы ! @ # $ %"
                           placeholder="Пароль"
                           setInputState={setPassword}
                           valid={validPassword}
                           inputState={password}
                           inputFocus={passwordFocus}
                           setInputFocus={setPasswordFocus}
                           ariaDescribedby="pwdnote"
                        />
                        <InputBlock
                           type="password"
                           errorMessage="Должно совпадать с первым полем ввода пароля"
                           placeholder="Повторите пароль"
                           setInputState={setMatchPassword}
                           valid={validMatchPassword}
                           inputState={matchPassword}
                           inputFocus={matchPasswordFocus}
                           setInputFocus={setMatchPasswordFocus}
                           ariaDescribedby="confirmnote"
                        />
                        <button
                           onClick={addNewUser}
                           className={
                              validUserName &&
                              validEmail &&
                              validPassword &&
                              validMatchPassword
                                 ? "registration__button active"
                                 : "registration__button disabled"
                           }
                           disabled={
                              !validUserName ||
                              !validEmail ||
                              !validPassword ||
                              !validMatchPassword
                                 ? true
                                 : false
                           }
                        >
                           Зарегистрироваться
                        </button>
                     </form>
                     <p className="registration__to-autorization">
                        Если Вы уже зарегистрированны, перейдите по ссылке:
                     </p>
                     <Link className="link" to="/auth/authorization">
                        Ввойти
                     </Link>
                  </div>
               </div>
            </section>
         )}
      </Container>
   );
};

export default Registration;
