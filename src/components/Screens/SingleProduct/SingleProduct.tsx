import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { IoCartOutline } from "react-icons/io5";

import "./SingleProduct.css";
import ProductListWithTitle from "../../ProductListWithTitle/ProductListWithTitle";
import { CartService } from "../../../services/cartService";
import { Product } from "../../../types/product";
import { ProductFilter } from "../../../services/models/productFilter";
import { ProductResponse } from "../../../services/models/productResponse";
import { ProductService } from "../../../services/productService";

const SingleProduct: React.FC = () => {
   const { productId } = useParams();
   const [product, setProduct] = useState<Product>();
   const [showMessage, setShowMessage] = useState<boolean>(false);

   useEffect(() => {
      (async () => {
         let product = await new ProductService().getProductById(
            Number(productId)
         );
         console.log(product);
         setProduct(product);
      })();
   }, []);

   const addProductToCart = () => {
      if (product != undefined) {
         const addProducts = new CartService().addProduct(product);
         setShowMessage(true);

         setTimeout(() => {
            setShowMessage(false);
         }, 1000);
      }
   };

   return (
      <section className="product-item">
         {product && (
            <div className="product-item__body" key={product.id}>
               <h2 className="product-item__title">{product.name}</h2>
               <div className="product-item__information">
                  <img
                     src={product.image}
                     alt=""
                     className="product-item__image"
                  />
                  <div className="product-item__description">
                     <div className="product-item__price-wrapper">
                        <div className="product-item__price-items">
                           <p className="product-item__price-current">
                              {product.price}₸
                           </p>
                           <p className="product-item__price-description">
                              за 1 уп. <span>({product.price}₸/уп.)</span>
                           </p>
                        </div>
                        <button onClick={addProductToCart} className="product-item__button-counter">
                           <IoCartOutline />
                           Добавить в корзину
                        </button>
                     </div>
                     <p className="brand">
                        Бренд: <span>{product.brand}</span>
                     </p>
                     <p className="product-item__text">{product.message}</p>
                  </div>
               </div>
            </div>
         )}

         <Link to="/products">Back to products</Link>
         <ProductListWithTitle title="Рекомендуемые товары" />
      </section>
   );
};

export default SingleProduct;
