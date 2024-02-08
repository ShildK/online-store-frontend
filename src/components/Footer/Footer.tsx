import { FC } from "react";
import "./Footer.css";

const Footer: FC = () => {
   return (
      <div className="footer">
         <div className="footer-body">
            <img
               src={`${process.env.PUBLIC_URL}/img/logo-footer.png`}
               alt=""
               className="footer__logo"
            />
            <div className="footer__description">
               <div className="footer__contacts">
                  <p className="footer__text">Телефон доставки</p>
                  <p className="footer__text">г. Астана:</p>
                  <p className="footer__text_green">+7 (777) 77 77</p>
                  <p className="footer__text_green">happy_famealy@gmail.com</p>
               </div>
               <ul className="footer__links">
                  <li className="footer__link">
                     <a>О нас</a>
                  </li>
                  <li className="footer__link">
                     <a>Доставка</a>
                  </li>
                  <li className="footer__link">
                     <a>Вакансии</a>
                  </li>
                  <li className="footer__link">
                     <a>Рекламодателям</a>
                  </li>
                  <li className="footer__link">
                     <a>FAQ</a>
                  </li>
               </ul>
               <div className="networks">
                  <img
                     className="networks-logo"
                     src={`${process.env.PUBLIC_URL}/img/networks1.png`}
                     alt=""
                  />
               </div>
            </div>
            <div className="footer__line"></div>
            <div className="footer__copyright">
               <p className="footer__copyright-text">
                  © 2024. Все права защищены. <a>Публичная оферта</a>
               </p>
            </div>
         </div>
      </div>
   );
};

export default Footer;
