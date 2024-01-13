import CatalogItem from "./CatalogItem/CatalogItem";
import "./Catalogs.css";
import { FC } from "react";

type TProps = {};

const Catalogs: FC<TProps> = (props) => {
   return (
      <div className="catalods">
         <h2 className="catalogs__title">Каталоги</h2>
         <div className="catalogs__items">
            <CatalogItem title="Крупы, консервы, снэки" />
            <CatalogItem title="Крупы, консервы, снэки" />
            <CatalogItem title="Крупы, консервы, снэки" />
            <CatalogItem title="Крупы, консервы, снэки" />
            <CatalogItem title="Крупы, консервы, снэки" />
            <CatalogItem title="Крупы, консервы, снэки" />
            <CatalogItem title="Крупы, консервы, снэки" />
         </div>
      </div>
   );
};

export default Catalogs;
