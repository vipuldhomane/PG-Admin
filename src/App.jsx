import { Route, Routes } from "react-router-dom";
import "./App.css";
import { CarouselDemo } from "./components/demo/CarouselDemo";
import { Testing } from "./components/demo/testing";
import { Button } from "./components/ui/button";
import { SignUp } from "./pages/SignUp";
import { AdminDashbord } from "./pages/AdminDashbord";
import { LogIn } from "./pages/LogIn";

export default function App() {
  return (
    <>
      <h1 className="text-3xl font-bold  text-center text-red-500">
        Payment Gateway
      </h1>
      <Button>Testing</Button>
      <Routes>
        {/* Auth Routes */}
        <Route path="/login" element={<LogIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </>
  );
}
