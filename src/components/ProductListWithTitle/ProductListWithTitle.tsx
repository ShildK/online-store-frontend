import "./ProductListWithTitle.css";
import { FC } from "react";

import ProductCard from "../ProductCard/ProductCard";
import { Product } from "../../types/product";

interface TProps {
   title: string;
   products: Product[];
}

const ProductListWithTitle: FC<TProps> = ({ title, products }) => {

   return (
      <div className="products-list">
         <h2 className="products-list__title">{title}</h2>
         <div className="products-list__cards">
            {products.map((product) => {
               return <ProductCard key={product.id} product={product} />;
            })}
         </div>
      </div>
   );
};

export default ProductListWithTitle;
