import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import '@fortawesome/fontawesome-free/css/all.min.css';
import Header from './components/Header';
import Footer from './components/Footer';
import UserHeader from './components/user/UserHeader';
import ClubHeader from './components/club/ClubHeader';
import UserFooter from './components/user/UserFooter';
import ClubFooter from './components/club/ClubFooter';
import Home from './pages/Home';
import Ads from './pages/Ads';
import Subscriptions from './pages/Subscriptions';
import ServicesForClubs from './pages/ServicesForClubs';
import About from './pages/About';
import Contact from './pages/Contact';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgetPassword from './pages/ForgetPassword';
import Layout from './components/Layout';
import TermsOfService from './pages/TermsOfService';
import PrivacyPolicy from './pages/PrivacyPolicy';
import FAQ from './pages/FAQ';
import UserDashboard from './pages/user/Dashboard';
import UserSettings from './pages/user/Settings';
import UserSubscriptions from './pages/user/Subscriptions';
import UserPosts from './pages/user/Posts';
import UserPostForm from './pages/user/PostForm';
import UserPostDetail from './pages/user/PostDetail';
import UserLogout from './pages/user/Logout';

import ClubDashboard from './pages/club/Dashboard';
import ClubSettings from './pages/club/Settings';
import ClubSubscriptions from './pages/club/Subscriptions';
import ClubPosts from './pages/club/Posts';
import ClubPostForm from './pages/club/PostForm';
import ClubPostEditForm from './pages/club/PostEditForm';
import ClubPostDetail from './pages/club/PostDetail';
import ClubPostApplicant from './pages/club/ClubPostApplicant';
import ClubPostApplicantView from './pages/club/ClubPostApplicantView';


import ClubLogout from './pages/club/Logout';

// Component to handle headers and footers dynamically
const DynamicWrapper = ({ children }) => {
  const location = useLocation();

  const renderHeader = () => {
    if (location.pathname.startsWith('/user')) {
      return <UserHeader />;
    } else if (location.pathname.startsWith('/club')) {
      return <ClubHeader />;
    } else {
      return <Header />;
    }
  };

  const renderFooter = () => {
    if (location.pathname.startsWith('/user')) {
      return <UserFooter />;
    } else if (location.pathname.startsWith('/club')) {
      return <ClubFooter />;
    } else {
      return <Footer />;
    }
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
          <Route path="/" element={<Home />} />
          <Route path="/ads" element={<Ads />} />
          <Route path="/subscriptions" element={<Subscriptions />} />
          <Route path="/services" element={<ServicesForClubs />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forget-password" element={<ForgetPassword />} />
          <Route path="/terms-of-service" element={<TermsOfService />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/faqs" element={<FAQ />} />

          {/* user routes */}
          <Route path="/user/dashboard" element={<UserDashboard />} />
          <Route path="/user/settings" element={<UserSettings />} />
          <Route path="/user/subscriptions" element={<UserSubscriptions />} />
          <Route path="/user/posts" element={<UserPosts />} />
          <Route path="/user/post/create" element={<UserPostForm />} />
          <Route path="/user/post/:id" element={<UserPostDetail />} />
          <Route path="/user/logout" element={<UserLogout />} />

          {/* club routes */}
          <Route path="/club/dashboard" element={<ClubDashboard />} />
          <Route path="/club/settings" element={<ClubSettings />} />
          <Route path="/club/subscriptions" element={<ClubSubscriptions />} />
          <Route path="/club/posts" element={<ClubPosts />} />
          <Route path="/club/post/create" element={<ClubPostForm />} />
          <Route path="/club/post/view/:id" element={<ClubPostDetail />} />
          <Route path="/club/post/edit/:id" element={<ClubPostEditForm />} />
          <Route path="/club/post/applicants/:id" element={<ClubPostApplicant />} />
          <Route path="/club/post/applicant/view/:id" element={<ClubPostApplicantView />} />
          <Route path="/club/logout" element={<ClubLogout />} />
        </Routes>
      </DynamicWrapper>
    </Router>
  );
};

export default App;
