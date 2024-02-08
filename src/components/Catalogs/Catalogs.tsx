import { ProductService } from "../../services/productService";
import { Category } from "../../types/category";
import CatalogItem from "./CatalogItem/CatalogItem";
import "./Catalogs.css";
import { FC, useEffect, useState } from "react";

type TProps = {};

const Catalogs: FC<TProps> = (props) => {
   const [categories, setCategories] = useState<Category[]>([]);

   useEffect(() => {
      (async () => {
         const categories = await new ProductService().getCategories();
         setCategories(categories);
      })();
   }, []);
   return (
      <div className="catalods">
         <h2 className="catalogs__title">Каталоги</h2>
         <div className="catalogs__items">
            {categories.filter((category) => category.parentId === null).map(category => {
               return (
                  <CatalogItem key={category.id} title={category.name} icon={category.icon} categoryId={category.id}/>
               )
            })}
         </div>
      </div>
   );
};

export default Catalogs;
