import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Header from './components/Header';
import Footer from './components/Footer';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgetPassword from './pages/ForgetPassword';
import Layout from './components/Layout';

import AdminDashboard from './pages/admin/Dashboard';
import AdminSettings from './pages/admin/Settings';
import AdminSubscriptions from './pages/admin/Subscriptions';

import AdminUsers from './pages/admin/Users';

import AdminPosts from './pages/admin/Posts';
import AdminPostForm from './pages/admin/PostForm';
import AdminPostEditForm from './pages/admin/PostEditForm';
import AdminPostDetail from './pages/admin/PostDetail';
import AdminPostApplicant from './pages/admin/AdminPostApplicant';
import AdminPostApplicantView from './pages/admin/AdminPostApplicantView';

import AdminLogout from './pages/admin/Logout';

// Component to handle headers and footers dynamically
const DynamicWrapper = ({ children }) => {
  const location = useLocation();

  const renderHeader = () => {
    
      return <Header />;
    
  };

  const renderFooter = () => {
      return <Footer />;
  };

  return (
    <>
      {renderHeader()}
      <Layout>{children}</Layout>
      {renderFooter()}
    </>
  );
};

// Main App Component
const App = () => {
  return (
    <Router>
      <DynamicWrapper>
        <Routes>
       
          <Route path="/" element={<Login />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
         
          {/* admin routes */}
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="/admin/settings" element={<AdminSettings />} />
          <Route path="/admin/subscriptions" element={<AdminSubscriptions />} />
          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/posts" element={<AdminPosts />} />
          <Route path="/admin/post/create" element={<AdminPostForm />} />
          <Route path="/admin/post/view/:id" element={<AdminPostDetail />} />
          <Route path="/admin/post/edit/:id" element={<AdminPostEditForm />} />
          <Route path="/admin/post/applicants/:id" element={<AdminPostApplicant />} />
          <Route path="/admin/post/applicant/view/:id" element={<AdminPostApplicantView />} />
          <Route path="/admin/logout" element={<AdminLogout />} />
        </Routes>
      </DynamicWrapper>
    </Router>
  );
};

export default App;
