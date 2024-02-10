import React, { useEffect, useState } from "react";
import "./Pagination.css";

import { TSetState } from "../../types/others";
import { ProductService } from "../../services/productService";
import getPagesOffsetForCurrentPage from "../../services/pagesService";

interface TProps {
   currentPage: number;
   setCurrentPage: TSetState<number>;
   totalPages: number;
}

const Pagination: React.FC<TProps> = ({
   currentPage,
   setCurrentPage,
   totalPages,
}) => {
   useEffect(() => {
      updateNavigationBar();
   }, []);

   const [pagesNumbers, setPagesNumbers] = useState<number[]>([]);
   const [buttonsCount, setButtonsCount] = useState<number>(3);
   const maxButtonsCount: number = 3;

   const pagePrev = () => {
      if (currentPage > 1) {
         setCurrentPage(currentPage - 1);
      }
   };

   const pageNext = () => {
      if (currentPage < totalPages) {
         setCurrentPage(currentPage + 1);
      }
   };

   const goToThePage = (page: number) => {
      setCurrentPage(page);
   };
   const updateNavigationBar = () => {
      setButtonsCount(
         totalPages < maxButtonsCount ? totalPages : maxButtonsCount
      );
      setPagesNumbers(
         buttonsCount > 1
            ? getPagesOffsetForCurrentPage(
                 currentPage,
                 totalPages,
                 buttonsCount
              )
            : [1]
      );
   };

   return (
      <div className="pagination">
         <div className="buttons__line">
            <button
               className="button__pagination"
               onClick={() => goToThePage(1)}
            >
               First
            </button>
            <button
               className="button__pagination"
               disabled={currentPage <= 1}
               onClick={pagePrev}
            >
               {"<"}
            </button>
            {pagesNumbers.map((page) => (
               <button
                  key={"item" + page}
                  className={
                     page === currentPage
                        ? "button__pagination current_page"
                        : "button__pagination"
                  }
                  onClick={() => goToThePage(page)}
               >
                  {page}
               </button>
            ))}
            <button className="button__pagination" onClick={pageNext}>
               {">"}
            </button>
            <button
               className="button__pagination"
               onClick={() => goToThePage(totalPages)}
            >
               Last
            </button>
         </div>
      </div>
   );
};

export default Pagination;
