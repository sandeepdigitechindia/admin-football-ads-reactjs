import React from 'react';
import { useLocation } from 'react-router-dom';
import Breadcrumbs from './Breadcrumbs';

const Layout = ({ children }) => {
  const location = useLocation();

  const renderBreadcrumb = () => {
    // Do not render breadcrumb for user and admin panels
    if (!location.pathname.startsWith('/admin')) {
      return <Breadcrumbs />;
    }
    return null;
  };
  return (
    <div>
      {renderBreadcrumb()}
      {children}
    </div>
  );
};

export default Layout;
