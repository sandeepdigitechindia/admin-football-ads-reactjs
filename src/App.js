import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
  Navigate,
} from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import { ToastContainer } from "react-toastify";
import Header from "./components/Header";
import Footer from "./components/Footer";

import Login from "./pages/Login";
import Register from "./pages/Register";
import ForgetPassword from "./pages/ForgetPassword";

import AdminDashboard from "./pages/admin/Dashboard";
import AdminSettings from "./pages/admin/Settings";
import AdminProfile from "./pages/admin/Profile";

import AdminSubscriptions from "./pages/admin/subscriptions/Subscriptions";
import AdminSubscriptionForm from "./pages/admin/subscriptions/SubscriptionForm";
import AdminSubscriptionEdit from "./pages/admin/subscriptions/AdminSubscriptionEdit";
import AdminSubscriptionPurchase from "./pages/admin/subscriptions/AdminSubscriptionPurchase";

import AdminUserSubscriptions from "./pages/admin/usersubscriptions/UserSubscriptions";
import AdminUserSubscriptionForm from "./pages/admin/usersubscriptions/UserSubscriptionForm";
import AdminUserSubscriptionEdit from "./pages/admin/usersubscriptions/UserSubscriptionEdit";
import AdminUserSubscriptionPurchase from "./pages/admin/usersubscriptions/UserSubscriptionPurchase";

import AdminServices from "./pages/admin/services/Services";
import AdminServiceForm from "./pages/admin/services/ServiceForm";
import AdminServiceEdit from "./pages/admin/services/AdminServiceEdit";

import AdminTestimonials from "./pages/admin/testimonials/Testimonials";
import AdminTestimonialForm from "./pages/admin/testimonials/TestimonialForm";
import AdminTestimonialEdit from "./pages/admin/testimonials/TestimonialEditForm";

import AdminFaqs from "./pages/admin/faqs/Faqs";
import AdminFaqForm from "./pages/admin/faqs/FaqForm";
import AdminFaqEdit from "./pages/admin/faqs/AdminFaqEdit";

import AdminUsers from "./pages/admin/users/Users";
import AdminUserForm from "./pages/admin/users/UserForm";
import AdminUserView from "./pages/admin/users/AdminUserView";
import AdminUserEdit from "./pages/admin/users/AdminUserEdit";

import AdminClubs from "./pages/admin/clubs/Clubs";
import AdminClubForm from "./pages/admin/clubs/ClubForm";
import AdminClubView from "./pages/admin/clubs/AdminClubView";
import AdminClubEdit from "./pages/admin/clubs/AdminClubEdit";

import AdminPosts from "./pages/admin/posts/Posts";
import AdminPostForm from "./pages/admin/posts/PostForm";
import AdminPostEditForm from "./pages/admin/posts/PostEditForm";
import AdminPostDetail from "./pages/admin/posts/PostDetail";
import AdminPostApplicant from "./pages/admin/posts/AdminPostApplicant";

import ContactUs from "./pages/admin/pages/ContactUs";

import Newsletters from "./pages/admin/pages/Newsletters";

import isAuthenticated from "./authMiddleware";
import ProtectedRoute from "./components/ProtectedRoute";

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

const App = () => {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={true}
        closeOnClick
        pauseOnHover
        draggable
        theme="light"
      />
      <Router>
        <DynamicWrapper>
          <Routes>
            <Route
              path="/"
              element={
                !isAuthenticated() ? (
                  <Login />
                ) : (
                  <Navigate to="/admin/dashboard" />
                )
              }
            />

            <Route
              path="/login"
              element={
                !isAuthenticated() ? (
                  <Login />
                ) : (
                  <Navigate to="/admin/dashboard" />
                )
              }
            />
            <Route
              path="/register"
              element={
                !isAuthenticated() ? (
                  <Register />
                ) : (
                  <Navigate to="/admin/dashboard" />
                )
              }
            />
            <Route
              path="/forget-password"
              element={
                !isAuthenticated() ? (
                  <ForgetPassword />
                ) : (
                  <Navigate to="/admin/dashboard" />
                )
              }
            />

            {/* Protected Admin Routes */}
            <Route
              path="/admin/dashboard"
              element={<ProtectedRoute element={<AdminDashboard />} />}
            />
            <Route
              path="/admin/settings"
              element={<ProtectedRoute element={<AdminSettings />} />}
            />
            <Route
              path="/admin/profile"
              element={<ProtectedRoute element={<AdminProfile />} />}
            />

            <Route
              path="/admin/subscriptions"
              element={<ProtectedRoute element={<AdminSubscriptions />} />}
            />
            <Route
              path="/admin/subscription/create"
              element={<ProtectedRoute element={<AdminSubscriptionForm />} />}
            />
            <Route
              path="/admin/subscription/edit/:id"
              element={<ProtectedRoute element={<AdminSubscriptionEdit />} />}
            />
            <Route
              path="/admin/subscription-purchase"
              element={
                <ProtectedRoute element={<AdminSubscriptionPurchase />} />
              }
            />

            <Route
              path="/admin/user-subscriptions"
              element={<ProtectedRoute element={<AdminUserSubscriptions />} />}
            />
            <Route
              path="/admin/user-subscription/create"
              element={
                <ProtectedRoute element={<AdminUserSubscriptionForm />} />
              }
            />
            <Route
              path="/admin/user-subscription/edit/:id"
              element={
                <ProtectedRoute element={<AdminUserSubscriptionEdit />} />
              }
            />

            <Route
              path="/admin/user-subscription-purchase"
              element={
                <ProtectedRoute element={<AdminUserSubscriptionPurchase />} />
              }
            />

            <Route
              path="/admin/services"
              element={<ProtectedRoute element={<AdminServices />} />}
            />
            <Route
              path="/admin/service/create"
              element={<ProtectedRoute element={<AdminServiceForm />} />}
            />
            <Route
              path="/admin/service/edit/:id"
              element={<ProtectedRoute element={<AdminServiceEdit />} />}
            />

            <Route
              path="/admin/testimonials"
              element={<ProtectedRoute element={<AdminTestimonials />} />}
            />
            <Route
              path="/admin/testimonial/create"
              element={<ProtectedRoute element={<AdminTestimonialForm />} />}
            />
            <Route
              path="/admin/testimonial/edit/:id"
              element={<ProtectedRoute element={<AdminTestimonialEdit />} />}
            />

            <Route
              path="/admin/faqs"
              element={<ProtectedRoute element={<AdminFaqs />} />}
            />
            <Route
              path="/admin/faq/create"
              element={<ProtectedRoute element={<AdminFaqForm />} />}
            />
            <Route
              path="/admin/faq/edit/:id"
              element={<ProtectedRoute element={<AdminFaqEdit />} />}
            />

            <Route
              path="/admin/users"
              element={<ProtectedRoute element={<AdminUsers />} />}
            />
            <Route
              path="/admin/user/create"
              element={<ProtectedRoute element={<AdminUserForm />} />}
            />
            <Route
              path="/admin/user/view/:id"
              element={<ProtectedRoute element={<AdminUserView />} />}
            />
            <Route
              path="/admin/user/edit/:id"
              element={<ProtectedRoute element={<AdminUserEdit />} />}
            />

            <Route
              path="/admin/clubs"
              element={<ProtectedRoute element={<AdminClubs />} />}
            />
            <Route
              path="/admin/club/create"
              element={<ProtectedRoute element={<AdminClubForm />} />}
            />
            <Route
              path="/admin/club/view/:id"
              element={<ProtectedRoute element={<AdminClubView />} />}
            />
            <Route
              path="/admin/club/edit/:id"
              element={<ProtectedRoute element={<AdminClubEdit />} />}
            />

            <Route
              path="/admin/posts"
              element={<ProtectedRoute element={<AdminPosts />} />}
            />
            <Route
              path="/admin/post/create"
              element={<ProtectedRoute element={<AdminPostForm />} />}
            />
            <Route
              path="/admin/post/view/:id"
              element={<ProtectedRoute element={<AdminPostDetail />} />}
            />
            <Route
              path="/admin/post/edit/:id"
              element={<ProtectedRoute element={<AdminPostEditForm />} />}
            />
            <Route
              path="/admin/post/applicants/:id"
              element={<ProtectedRoute element={<AdminPostApplicant />} />}
            />
            <Route
              path="/admin/post/applicant/view/:id"
              element={<ProtectedRoute element={<AdminUserView />} />}
            />

            <Route
              path="/admin/contact-us"
              element={<ProtectedRoute element={<ContactUs />} />}
            />

            <Route
              path="/admin/newsletters"
              element={<ProtectedRoute element={<Newsletters />} />}
            />
          </Routes>
        </DynamicWrapper>
      </Router>
    </>
  );
};

export default App;
