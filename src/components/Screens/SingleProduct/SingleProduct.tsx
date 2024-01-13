import React from "react";
import { Link, useParams } from "react-router-dom";
import {IoCartOutline} from "react-icons/io5"

import "./SingleProduct.css";
import { products } from "../../../types/products";
import ProductListWithTitle from "../../ProductListWithTitle/ProductListWithTitle";

interface TProps {

}

const SingleProduct: React.FC = () => {
   const { productId } = useParams();
   

   return (
      <section className="product-item">
        {products.map((product) => {
          if(Number(productId) === product.id){
            return(
              <div className="product-item__body" key={product.id}>
                <h2 className="product-item__title">{product.name}</h2>
                <div className="product-item__information">
                  <img src={product.image} alt="" className="product-item__image" />
                  <div className="product-item__description">
                    <div className="product-item__price-wrapper">
                      <div className="product-item__price-items">
                        <p className="product-item__price-current">{product.price}₸</p>
                        <p className="product-item__price-description">за 1 уп. <span>({product.price}₸/уп.)</span></p>
                      </div>
                      <div className="product-item__button-counter"><IoCartOutline/> Добавить в корзину</div>
                    </div>
                    <p className="brand">Бренд: <span>{product.brand}</span></p>
                    <p className="product-item__text">{product.message}</p>
                  </div>
                </div>
              </div>
            )
          }
        })}
         <Link to="/products">Back to products</Link>

         <ProductListWithTitle title="Рекомендуемые товары"/>
      </section>
   );
};

export default SingleProduct;
