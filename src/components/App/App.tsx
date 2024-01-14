import "./index.css";
import React from 'react'
// import { useEffect, useState, useRef } from "react";
import AppRoutes from "../Routes/Routes";

const App: React.FC = () => {
   return <div className="app">
      <AppRoutes />
   </div>;
};

export const BACKEND_URL = 'http://localhost:3500';
export const FRONTEND_URL = 'http://localhost:3000';

export default App;
