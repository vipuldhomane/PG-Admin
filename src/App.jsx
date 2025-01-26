import { Route, Routes } from "react-router-dom";
import "./App.css";
import { lazy, Suspense, useState } from "react";
import { AdminDashbord } from "./pages/AdminDashbord";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ForgotPasswordPage from "./pages/ForgotPassword";

const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignUpPage = lazy(() => import("./pages/SignUp"));
const SignUpDetailsPage = lazy(() => import("./pages/SignUpDetails"));

export default function App() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen((prev) => !prev);
  };
  return (
    <>
      <Routes>
        {/* Auth Routes */}
        <Route
          path="/login"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <LoginPage />
            </Suspense>
          }
        />
        <Route
          path="/signup"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <SignUpPage />
            </Suspense>
          }
        />
        <Route
          path="/signupdetails"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <SignUpDetailsPage />
            </Suspense>
          }
        />
        <Route
          path="/forgot-password"
          element={
            <Suspense fallback={<div>Loading...</div>}>
              <ForgotPasswordPage />
            </Suspense>
          }
        />
        <Route
          path="/*"
          element={
            <>
              <Sidebar
                isMobileMenuOpen={isMobileMenuOpen}
                onClose={() => setIsMobileMenuOpen(false)}
              />
              <Navbar onMenuClick={toggleMobileMenu} />

              <Suspense fallback={<div>Loading your dashboard...</div>}>
                <Routes>
                  <Route path="/admin" element={<AdminDashbord />} />
                  <Route path="*" element={<div>Not Found</div>} />
                </Routes>
              </Suspense>
            </>
          }
        />
      </Routes>
    </>
  );
}
