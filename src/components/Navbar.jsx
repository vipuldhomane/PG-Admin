import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Menu, Boxes, User, LogOut, HandCoins } from "lucide-react";

const Navbar = ({ onMenuClick }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const handleLogoutClick = async () => {
    setLoading(true);
    // Simulate logout
    setTimeout(() => {
      setLoading(false);
      navigate("/login");
    }, 1000);
  };

  return (
    <div className="fixed top-0 right-0 left-0 md:left-64 h-16 bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 z-10 shadow-sm">
      <div className="h-full px-4 flex items-center justify-between">
        {/* Left section with mobile menu */}
        <div className="flex items-center">
          <button
            onClick={onMenuClick}
            className="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 md:hidden transition-colors"
          >
            <Menu className="h-6 w-6 text-gray-700 dark:text-gray-300" />
          </button>
        </div>

        {/* Center section with logo */}
        <div className="hidden md:flex items-center gap-2">
          <HandCoins className="h-8 w-8 text-blue-600 dark:text-blue-400" />
          <span className="text-xl font-bold text-gray-900 dark:text-gray-100">
            Payment Gateway
          </span>
        </div>

        {/* Right section with user info and logout */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-gray-200 dark:bg-gray-700 flex items-center justify-center">
            <User className="h-5 w-5 text-gray-700 dark:text-gray-300" />
          </div>
          <span className="hidden md:inline text-sm font-medium text-gray-900 dark:text-gray-100">
            John Doe
          </span>

          <button
            className="flex items-center gap-2 px-3 py-2 text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
            aria-label="Logout"
            onClick={handleLogoutClick}
          >
            <LogOut className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
