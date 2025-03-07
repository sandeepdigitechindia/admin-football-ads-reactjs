import React from "react";
import { useLocation } from "react-router-dom";
import Header from "./Header";
import Footer from "./Footer";

const DynamicWrapper = ({ children }) => {
 
    const location = useLocation();
    const adminRoutes = ["/admin"];
    const shouldRenderHeader = () =>
      adminRoutes.some((route) => location.pathname.startsWith(route));
  
    return (
      <>
        {shouldRenderHeader() && <Header />}
        {children}
        {shouldRenderHeader() && <Footer />}
      </>
    );
};

export default DynamicWrapper;
