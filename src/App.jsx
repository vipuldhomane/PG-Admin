import { Route, Routes, Navigate } from "react-router-dom";
import "./App.css";
import { lazy, Suspense, useState } from "react";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import ProtectedRoute from "./components/ProtectedRoutes";
import { AdminDashboard } from "./pages/AdminDashboard";

// Lazy-loaded components
const LoginPage = lazy(() => import("./pages/LoginPage"));
const SignUpPage = lazy(() => import("./pages/SignUp"));
const SignUpDetailsPage = lazy(() => import("./pages/SignUpDetails"));
const ForgotPasswordPage = lazy(() => import("./pages/ForgotPassword"));
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
        <Route path="/signupdetails" element={<SignUpDetailsPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />

        {/* Protected Routes (only for logged-in users) */}
        <Route element={<ProtectedRoute />}>
          <Route
            path="/admin"
            element={
              <>
                <Sidebar
                  isMobileMenuOpen={isMobileMenuOpen}
                  onClose={() => setIsMobileMenuOpen(false)}
                />
                <Navbar onMenuClick={toggleMobileMenu} />
                <div className="ml-64 p-4">
                  <AdminDashboard />
                </div>
              </>
            }
          />
        </Route>

        {/* Redirect unknown routes */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Suspense>
  );
}

// import { Route, Routes } from "react-router-dom";
// import "./App.css";
// import { lazy, Suspense, useState } from "react";
// import { AdminDashbord } from "./pages/AdminDashbord";
// import Sidebar from "./components/Sidebar";
// import Navbar from "./components/Navbar";

// const LoginPage = lazy(() => import("./pages/LoginPage"));
// const SignUpPage = lazy(() => import("./pages/SignUp"));
// const SignUpDetailsPage = lazy(() => import("./pages/SignUpDetails"));
// const ForgotPasswordPage = lazy(() => import("./pages/ForgotPassword"));

// export default function App() {
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen((prev) => !prev);
//   };
//   return (
//     <>
//       <Routes>
//         {/* Auth Routes */}
//         <Route
//           path="/login"
//           element={
//             <Suspense fallback={<div>Loading...</div>}>
//               <LoginPage />
//             </Suspense>
//           }
//         />
//         <Route
//           path="/signup"
//           element={
//             <Suspense fallback={<div>Loading...</div>}>
//               <SignUpPage />
//             </Suspense>
//           }
//         />
//         <Route
//           path="/signupdetails"
//           element={
//             <Suspense fallback={<div>Loading...</div>}>
//               <SignUpDetailsPage />
//             </Suspense>
//           }
//         />
//         <Route
//           path="/forgot-password"
//           element={
//             <Suspense fallback={<div>Loading...</div>}>
//               <ForgotPasswordPage />
//             </Suspense>
//           }
//         />
//         <Route
//           path="/*"
//           element={
//             <>
//               <Sidebar
//                 isMobileMenuOpen={isMobileMenuOpen}
//                 onClose={() => setIsMobileMenuOpen(false)}
//               />
//               <Navbar onMenuClick={toggleMobileMenu} />

//               <Suspense fallback={<div>Loading your dashboard...</div>}>
//                 <Routes>
//                   <Route path="/admin" element={<AdminDashbord />} />
//                   <Route path="*" element={<div>Not Found</div>} />
//                 </Routes>
//               </Suspense>
//             </>
//           }
//         />
//       </Routes>
//     </>
//   );
// }
