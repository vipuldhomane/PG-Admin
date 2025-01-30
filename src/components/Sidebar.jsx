import React from "react";
import { Bell, HandCoins } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { cn } from "@/utils/cn";

const Sidebar = ({ isMobileMenuOpen, onClose }) => {
  const location = useLocation();
  const currentPath = location.pathname;

  const menuItems = [
    { icon: Bell, label: "merchants", href: "/merchants" },
    // { icon: Bell, label: "PayIn", href: "/payin" },
    // { icon: Bell, label: "PayOut", href: "/payout" },
    // { icon: Bell, label: "Settlement", href: "/settlement" },
  ];

  const sidebarClasses = cn(
    "fixed top-0 left-0 h-full w-64 bg-gray-900 dark:bg-gray-950 text-white transition-transform duration-300 ease-in-out z-20",
    isMobileMenuOpen ? "translate-x-0" : "-translate-x-full",
    "md:translate-x-0"
  );

  return (
    <>
      <div className={sidebarClasses}>
        <div className="p-4">
          <div className="flex items-center gap-2 mb-8">
            <HandCoins className="h-8 w-8 text-blue-400" />

            <span className="text-xl font-bold text-white">PG Admin</span>
          </div>
          <nav>
            {menuItems.map((item) => (
              <Link
                key={item.label}
                to={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 text-gray-300 hover:bg-gray-800 dark:hover:bg-gray-900 rounded-lg transition-colors",
                  currentPath === item.href &&
                    "bg-blue-800 dark:bg-blue-900 text-white"
                )}
                onClick={() => onClose()}
              >
                <item.icon className="h-5 w-5" />
                <span>{item.label}</span>
              </Link>
            ))}
          </nav>
        </div>
      </div>
      {/* Overlay for mobile */}
      {isMobileMenuOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={onClose}
        />
      )}
    </>
  );
};

export default Sidebar;
