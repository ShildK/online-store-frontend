import React, { useState } from "react";
import "./ModalCategory.css";

import {MdOutlineBakeryDining} from "react-icons/md"
import {LuMilk, LuApple, LuCandy, LuFish, LuFlower} from "react-icons/lu"
import {IoFishOutline} from "react-icons/io5"
import {TbMeat, TbSausage} from "react-icons/tb"
import {GiBeerBottle} from "react-icons/gi"
import {CiWheat} from "react-icons/ci"
import { Link } from "react-router-dom";

interface TProps {
   isHovered: boolean;
}

const ModalCategory: React.FC<TProps> = ({ isHovered }) => {
   return <div className={`modal ${isHovered ? "visible" : ""}`}>
    <div className="categories__names">
        <ul className="categories__list">
            <li className="category"><div className="fruts"><LuApple/></div><Link className="categories__link" to="/products/categiryId">Свежие овощи и фрукты</Link></li>
            <li className="category"><div className="milk"><LuMilk/></div><Link className="categories__link" to="/products/categiryId">Молоко, сыр, масло, яйца</Link></li>
            <li className="category"><div className="sausage"><TbSausage/></div><Link className="categories__link" to="/products/categiryId">Колбасы</Link></li>
            <li className="category"><div className="meat"><TbMeat/></div><Link className="categories__link" to="/products/categiryId">Мясо, птица</Link></li>
            <li className="category"><div className="cereal"><CiWheat/></div><Link className="categories__link" to="/products/categiryId">Крупы, консервы, снеки</Link></li>
            <li className="category"><div className="fish"><LuFish/></div><Link className="categories__link" to="/products/categiryId">Рыба и морепродукты</Link></li>
            <li className="category"><div className="candy"><LuCandy /></div><Link className="categories__link" to="/products/categiryId">Сладости</Link></li>
            <li className="category"><div className="beauty"><LuFlower /></div><Link className="categories__link" to="/products/categiryId">Красота</Link></li>
        </ul>
    </div>
    <div className="subcategories__names">
    <ul className="subcategorues__list">
            <li className="subcategory"></li>
            <li className="subcategory"></li>
            <li className="subcategory"></li>
            <li className="subcategory"></li>
            <li className="subcategory"></li>
            <li className="subcategory"></li>
            <li className="subcategory"></li>
        </ul>
    </div>
   </div>;
};

export default ModalCategory;
