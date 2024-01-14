import "./ProductListWithTitle.css";
import { FC } from "react";
import { TSetState } from "../../types/others";

import ProductCard from "../ProductCard/ProductCard";

interface TProps {
   title: string;
}

const ProductListWithTitle: FC<TProps> = (props) => {


   const { title } = props;
   return (
      <div className="products-list">
         <h2 className="products-list__title">{title}</h2>
         {/* <div className="products-list__cards">
            {products.map((product) => {
               if (product.id <= 5) {
                  return (
                     <ProductCard
                        key={product.id}
                        product={product}
                     />
                  );
               }
            })}
         </div> */}
      </div>
   );
};

export default ProductListWithTitle;
