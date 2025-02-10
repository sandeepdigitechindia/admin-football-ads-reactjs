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

import AdminSubscriptions from "./pages/admin/Subscriptions";
import AdminSubscriptionForm from "./pages/admin/SubscriptionForm";
import AdminSubscriptionEdit from "./pages/admin/AdminSubscriptionEdit";

import AdminServices from "./pages/admin/Services";
import AdminServiceForm from "./pages/admin/ServiceForm";
import AdminServiceEdit from "./pages/admin/AdminServiceEdit";

import AdminUsers from "./pages/admin/Users";
import AdminUserForm from "./pages/admin/UserForm";
import AdminUserView from "./pages/admin/AdminUserView";
import AdminUserEdit from "./pages/admin/AdminUserEdit";

import AdminClubs from "./pages/admin/Clubs";
import AdminClubForm from "./pages/admin/ClubForm";
import AdminClubView from "./pages/admin/AdminClubView";
import AdminClubEdit from "./pages/admin/AdminClubEdit";

import AdminPosts from "./pages/admin/Posts";
import AdminPostForm from "./pages/admin/PostForm";
import AdminPostEditForm from "./pages/admin/PostEditForm";
import AdminPostDetail from "./pages/admin/PostDetail";
import AdminPostApplicant from "./pages/admin/AdminPostApplicant";

import TransactionHistory from "./pages/admin/TransactionHistory";

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
              path="/admin/transaction-history"
              element={<ProtectedRoute element={<TransactionHistory />} />}
            />
          </Routes>
        </DynamicWrapper>
      </Router>
    </>
  );
};

export default App;
