import { PayOutTable } from "@/components/PayOutTable";

const PayOut = () => {
  return (
    <div className="container mx-auto p-4 border border-gray-300 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg min-h-screen">
      {/* <h1>PayOut</h1> */}
      <PayOutTable />
      {/* <PaymentSettingsModal /> */}
    </div>
  );
};

export default PayOut;
