import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { lazy, Suspense, useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoutes";
import { AdminDashboard } from "./pages/AdminDashboard";
import PayIn from "./pages/Payin";
import PayOut from "./pages/PayOut";
import Settlement from "./pages/Settlement";
import Profile from "./pages/Profile";
import PaymentAPI from "./pages/PaymentApi";
// import { Merchants } from "./pages/Merchants";

// Lazy-loaded components
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignUpPage = lazy(() => import("./pages/SignUp"));
const SignUpDetailsPage = lazy(() => import("./pages/SignUpDetails"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPassword"));
const Merchants = lazy(() => import("./pages/Merchants"));
// const AdminDashboard = lazy(() => import("./pages/AdminDashboard"));

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => setIsMobileMenuOpen((prev) => !prev);

  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        {/* Public Routes (accessible without login) */}
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignUpPage />} />

        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
        {/* enable protected routes afterwards */}
        {/* Protected Routes (only for logged-in users) */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/*"
            element={
              <>
                <Sidebar
                  isMobileMenuOpen={isMobileMenuOpen}
                  onClose={() => setIsMobileMenuOpen(false)}
                />
                <Navbar onMenuClick={toggleMobileMenu} />
                <div className="md:ml-64 p-4 mt-16">
                  <Routes>
                    <Route index element={<AdminDashboard />} />
                    <Route path="merchants" element={<Merchants />} />
                    <Route path="payin" element={<PayIn />} />
                    <Route path="payout" element={<PayOut />} />
                    <Route path="settlement" element={<Settlement />} />
                    <Route path="profile" element={<Profile />} />
                    <Route path="payment-api" element={<PaymentAPI />} />
                  </Routes>
                </div>
              </>
            }
          />
        </Route>

        {/* Redirect unknown routes */}
        {/* <Route path="*" element={<Navigate to="/login" replace />} /> */}
      </Routes>
    </Suspense>
  );
}
