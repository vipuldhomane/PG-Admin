import { PaymentDashboard } from "@/components/payment-dashboard";

export const AdminDashboard = () => {
  return (
    <div className="container mx-auto p-4 border border-gray-300 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg min-h-screen">
      <PaymentDashboard />
    </div>
  );
};
