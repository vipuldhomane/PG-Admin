import { PaymentDashboard } from "@/components/payment-dashboard";
import { FlipText } from "@/components/ui/flip-text";
import React from "react";

export const AdminDashboard = () => {
  return (
    <div className="container mx-auto p-4 border border-gray-300 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg min-h-screen">
      <PaymentDashboard />
    </div>
  );
};
