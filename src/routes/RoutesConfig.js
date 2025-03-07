import React from "react";
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "../components/ProtectedRoute";

// Public Pages
import Login from "../pages/Login";
import Register from "../pages/Register";
import ForgetPassword from "../pages/ForgetPassword";

// Admin Pages
import AdminDashboard from "../pages/admin/Dashboard";
import AdminSettings from "../pages/admin/Settings";
import AdminProfile from "../pages/admin/Profile";

// Subscriptions
import AdminSubscriptions from "../pages/admin/subscriptions/Subscriptions";
import AdminSubscriptionForm from "../pages/admin/subscriptions/SubscriptionForm";
import AdminSubscriptionEdit from "../pages/admin/subscriptions/AdminSubscriptionEdit";
import AdminSubscriptionPurchase from "../pages/admin/subscriptions/AdminSubscriptionPurchase";

// User Subscriptions
import AdminUserSubscriptions from "../pages/admin/usersubscriptions/UserSubscriptions";
import AdminUserSubscriptionForm from "../pages/admin/usersubscriptions/UserSubscriptionForm";
import AdminUserSubscriptionEdit from "../pages/admin/usersubscriptions/UserSubscriptionEdit";
import AdminUserSubscriptionPurchase from "../pages/admin/usersubscriptions/UserSubscriptionPurchase";

// Services
import AdminServices from "../pages/admin/services/Services";
import AdminServiceForm from "../pages/admin/services/ServiceForm";
import AdminServiceEdit from "../pages/admin/services/AdminServiceEdit";

// Testimonials
import AdminTestimonials from "../pages/admin/testimonials/Testimonials";
import AdminTestimonialForm from "../pages/admin/testimonials/TestimonialForm";
import AdminTestimonialEdit from "../pages/admin/testimonials/TestimonialEditForm";

// FAQs
import AdminFaqs from "../pages/admin/faqs/Faqs";
import AdminFaqForm from "../pages/admin/faqs/FaqForm";
import AdminFaqEdit from "../pages/admin/faqs/AdminFaqEdit";

// Users
import AdminUsers from "../pages/admin/users/Users";
import AdminUserForm from "../pages/admin/users/UserForm";
import AdminUserView from "../pages/admin/users/AdminUserView";
import AdminUserEdit from "../pages/admin/users/AdminUserEdit";

// Clubs
import AdminClubs from "../pages/admin/clubs/Clubs";
import AdminClubForm from "../pages/admin/clubs/ClubForm";
import AdminClubView from "../pages/admin/clubs/AdminClubView";
import AdminClubEdit from "../pages/admin/clubs/AdminClubEdit";

// Posts
import AdminPosts from "../pages/admin/posts/Posts";
import AdminPostForm from "../pages/admin/posts/PostForm";
import AdminPostEditForm from "../pages/admin/posts/PostEditForm";
import AdminPostDetail from "../pages/admin/posts/PostDetail";
import AdminPostApplicant from "../pages/admin/posts/AdminPostApplicant";

// Other Pages
import ContactUs from "../pages/admin/pages/ContactUs";
import Newsletters from "../pages/admin/pages/Newsletters";

import { CountryProvider } from "../context/CountryContext";

// Define Routes
const RoutesConfig = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />

      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forget-password" element={<ForgetPassword />} />

      {/* Protected Admin Routes */}
      <Route element={<ProtectedRoute allowedRoles={["admin", "sub-admin"]} />}>
        <Route path="/admin/dashboard" element={<AdminDashboard />} />
        <Route path="/admin/settings" element={<AdminSettings />} />
        <Route
          path="/admin/profile"
          element={
            <CountryProvider>
              <AdminProfile />
            </CountryProvider>
          }
        />
        <Route path="/admin/subscriptions" element={<AdminSubscriptions />} />
        <Route
          path="/admin/subscription/create"
          element={<AdminSubscriptionForm />}
        />
        <Route
          path="/admin/subscription/edit/:id"
          element={<AdminSubscriptionEdit />}
        />
        <Route
          path="/admin/subscription-purchase"
          element={<AdminSubscriptionPurchase />}
        />
        <Route
          path="/admin/user-subscriptions"
          element={<AdminUserSubscriptions />}
        />
        <Route
          path="/admin/user-subscription/create"
          element={<AdminUserSubscriptionForm />}
        />
        <Route
          path="/admin/user-subscription/edit/:id"
          element={<AdminUserSubscriptionEdit />}
        />
        <Route
          path="/admin/user-subscription-purchase"
          element={<AdminUserSubscriptionPurchase />}
        />

        <Route path="/admin/services" element={<AdminServices />} />
        <Route path="/admin/service/create" element={<AdminServiceForm />} />
        <Route path="/admin/service/edit/:id" element={<AdminServiceEdit />} />
        <Route path="/admin/testimonials" element={<AdminTestimonials />} />
        <Route
          path="/admin/testimonial/create"
          element={<AdminTestimonialForm />}
        />
        <Route
          path="/admin/testimonial/edit/:id"
          element={<AdminTestimonialEdit />}
        />
        <Route path="/admin/faqs" element={<AdminFaqs />} />
        <Route path="/admin/faq/create" element={<AdminFaqForm />} />
        <Route path="/admin/faq/edit/:id" element={<AdminFaqEdit />} />
        <Route path="/admin/users" element={<AdminUsers />} />
        <Route
          path="/admin/user/create"
          element={
            <CountryProvider>
              <AdminUserForm />
            </CountryProvider>
          }
        />
        <Route path="/admin/user/view/:id" element={<AdminUserView />} />
        <Route
          path="/admin/user/edit/:id"
          element={
            <CountryProvider>
              <AdminUserEdit />
            </CountryProvider>
          }
        />
        <Route path="/admin/clubs" element={<AdminClubs />} />
        <Route
          path="/admin/club/create"
          element={
            <CountryProvider>
              <AdminClubForm />
            </CountryProvider>
          }
        />
        <Route path="/admin/club/view/:id" element={<AdminClubView />} />
        <Route
          path="/admin/club/edit/:id"
          element={
            <CountryProvider>
              <AdminClubEdit />
            </CountryProvider>
          }
        />
        <Route path="/admin/posts" element={<AdminPosts />} />
        <Route path="/admin/post/create" element={<AdminPostForm />} />
        <Route path="/admin/post/view/:id" element={<AdminPostDetail />} />
        <Route path="/admin/post/edit/:id" element={<AdminPostEditForm />} />
        <Route
          path="/admin/post/applicants/:id"
          element={<AdminPostApplicant />}
        />
        <Route
          path="/admin/post/applicant/view/:id"
          element={<AdminUserView />}
        />
        <Route path="/admin/contact-us" element={<ContactUs />} />
        <Route path="/admin/newsletters" element={<Newsletters />} />
      </Route>
    </Routes>
  );
};

export default RoutesConfig;
