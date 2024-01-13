import "./CatalogItem.css";
import { FC } from "react";

type TProps = {
   title: string;
};

const CatalogItem: FC<TProps> = (props) => {
   const {title} = props;
   return (
      <div className="catalog-item">
         <img className="catalog-item__icon" src="https://arbuz.kz/image/s3/arbuz-kz-catalogs/225169-krupy_konservy_sneki.svg" alt="" />
         <p className="catalog-item__title">{title}</p>
      </div>
   );
};

export default CatalogItem;
