import React, { useEffect, useState } from "react";
import {
   Route,
   Outlet,
   createBrowserRouter,
   createRoutesFromElements,
   RouterProvider,
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
import OrderRegistration from "../Screens/OrderRegistration/OrderRegistration";

const AppRoutes = () => {
   const router = createBrowserRouter(
      createRoutesFromElements(
            <>
               <Route path="/" element={<RootLayout />}>
                  <Route index element={<Home />} />
                  <Route path="home" element={<Home />} />
                  <Route path="products" element={<Products />} />
                  <Route path="products/:categoryId" element={<Products />} />
                  <Route path="products/:searchText" element={<Products />} />
                  <Route
                     path="products/item/:productId"
                     element={<SingleProduct />}
                  />
                  <Route path="cart" element={<Cart />} />
               </Route>
               <Route path="/auth" element={<SimpleLayout />}>
                  <Route index element={<Authorization />} />
                  <Route path="registration" element={<Registration />} />
                  <Route path="authorization" element={<Authorization />} />
               </Route>
               <Route path="/order" element={<SimpleLayout />}>
                  <Route index element={<OrderRegistration />} />
                  <Route path="decoration" element={<OrderRegistration />} />
               </Route>
            </>
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

   function SimpleLayout() {
      return <Outlet />;
   }

   return <RouterProvider router={router} />;
};

export default AppRoutes;
