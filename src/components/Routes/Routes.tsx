import React from "react";
import {
   Route,
   Routes,
   Outlet,
   createBrowserRouter,
   createRoutesFromElements,
   RouterProvider,
   BrowserRouter,
} from "react-router-dom";

import Home from "../Screens/Home/Home";
import Container from "../Container/Container";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Products from "../Screens/Products/Products";
import SingleProduct from "../Screens/SingleProduct/SingleProduct";
import Registration from "../Screens/Registration/Registration";
import Authorization from "../Screens/Authorization/Authorization";
import Cart from "../Screens/Cart/Cart";

const AppRoutes = () => {
   const router = createBrowserRouter(
      createRoutesFromElements(
         <Route path="/" element={<RootLayout />}>
            <Route index element={<Home />} />
            <Route path="home" element={<Home />} />
            <Route path="products" element={<Products />} />
            <Route path="products/:categoryId" element={<Products />} />
            <Route path="products/:searchText" element={<Products />} />
            <Route path="products/item/:productId" element={<SingleProduct />} />
            <Route path="cart" element={<Cart />} />
            <Route path="registration" element={<Registration />} />
            <Route path="authorization" element={<Authorization />} />
         </Route>
      )
   );

   function RootLayout() {
      return (
         <>
            <Header />
            <Container>
               <Outlet />
            </Container>
            <Footer />
         </>
      );
   }

   return (
      // <BrowserRouter>
         <RouterProvider router={router} />
      // </BrowserRouter>
   );
};

export default AppRoutes;
