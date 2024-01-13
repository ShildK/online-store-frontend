import "./index.css";
import React from 'react'
// import { useEffect, useState, useRef } from "react";
import AppRoutes from "../Routes/Routes";

const App: React.FC = () => {
   //    const [products, setProducts] = useState([]);
   // const [image, setImage] = useState();
   //    async function getFirst100BookCovers() {
   //       const apiUrl =
   //          "https://b9f0bb55-387b-4c2b-afa0-cc5a9b8327e0.mock.pstmn.io";

   //       const req = await fetch(apiUrl);
   //       console.log(req);
   //       const data = await req.json();
   //       console.log(data);
   //       setProducts(data.products);
   //       console.log(products);
   //    }
   //    getFirst100BookCovers();

   //    useEffect(() => {
   // console.log(products);
   // setImage(products[0]);
   // console.log(image);
   //    }, []);

   return <div className="app">
      <AppRoutes />
   </div>;
};

export default App;
