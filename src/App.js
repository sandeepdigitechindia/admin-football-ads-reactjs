import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Header from './components/Header';
import Footer from './components/Footer';

import Login from './pages/Login';
import Register from './pages/Register';
import ForgetPassword from './pages/ForgetPassword';

import AdminDashboard from './pages/admin/Dashboard';
import AdminSettings from './pages/admin/Settings';


import AdminSubscriptions from './pages/admin/Subscriptions';
import AdminSubscriptionForm from './pages/admin/SubscriptionForm';
import AdminSubscriptionEdit from './pages/admin/AdminSubscriptionEdit';



import AdminUsers from './pages/admin/Users';
import AdminUserForm from './pages/admin/UserForm';
import AdminUserView from './pages/admin/AdminUserView';
import AdminUserEdit from './pages/admin/AdminUserEdit';

import AdminClubs from './pages/admin/Clubs';
import AdminClubForm from './pages/admin/ClubForm';
import AdminClubView from './pages/admin/AdminClubView';
import AdminClubEdit from './pages/admin/AdminClubEdit';


import AdminPosts from './pages/admin/Posts';
import AdminPostForm from './pages/admin/PostForm';
import AdminPostEditForm from './pages/admin/PostEditForm';
import AdminPostDetail from './pages/admin/PostDetail';
import AdminPostApplicant from './pages/admin/AdminPostApplicant';

import TransactionHistory from './pages/admin/TransactionHistory';

import AdminLogout from './pages/admin/Logout';

// Component to handle headers and footers dynamically
const DynamicWrapper = ({ children }) => {
  const location = useLocation();

  // Function to determine if the header should be rendered
  const shouldRenderHeader = () => {
    const adminRoutes = [
      "/admin/dashboard",
      "/admin/settings",

      "/admin/subscriptions",
      "/admin/subscription/create",
      "/admin/subscription/edit",

      "/admin/users",
      "/admin/user/create",
      "/admin/user/view",
      "/admin/user/edit",

      "/admin/clubs",
      "/admin/club/create",
      "/admin/club/view",
      "/admin/club/edit",
      "/admin/post/club/view",

      "/admin/posts",
      "/admin/post/create",
      
      "/admin/post/view",
      "/admin/post/edit",
      "/admin/post/applicants", 
      "/admin/post/applicant/view",
      
      "/admin/transaction-history",

      "/admin/logout",
    ];
    return adminRoutes.some((route) => location.pathname.startsWith(route));
  };

  return (
    <>
      {shouldRenderHeader() && <Header />}
      {children}
      {shouldRenderHeader() && <Footer />}

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
          <Route path="/admin/subscription/create" element={<AdminSubscriptionForm />} />
          <Route path="/admin/subscription/edit/:id" element={<AdminSubscriptionEdit />} />

          <Route path="/admin/users" element={<AdminUsers />} />
          <Route path="/admin/user/create" element={<AdminUserForm />} />
          <Route path="/admin/user/view/:id" element={<AdminUserView />} />
          <Route path="/admin/user/edit/:id" element={<AdminUserEdit />} />

          <Route path="/admin/clubs" element={<AdminClubs />} />
          <Route path="/admin/club/create" element={<AdminClubForm />} />
          <Route path="/admin/club/view/:id" element={<AdminClubView />} />
          <Route path="/admin/club/edit/:id" element={<AdminClubEdit />} />

          <Route path="/admin/posts" element={<AdminPosts />} />
          <Route path="/admin/post/create" element={<AdminPostForm />} />
          <Route path="/admin/post/view/:id" element={<AdminPostDetail />} />
          <Route path="/admin/post/edit/:id" element={<AdminPostEditForm />} />
          <Route path="/admin/post/applicants/:id" element={<AdminPostApplicant />} />
          <Route path="/admin/post/applicant/view/:id" element={<AdminUserView />} />

          <Route path="/admin/transaction-history" element={<TransactionHistory />} />
         
          <Route path="/admin/logout" element={<AdminLogout />} />
        </Routes>
      </DynamicWrapper>
    </Router>
  );
};

export default App;
