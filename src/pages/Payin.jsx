// const PayIn = () => {
//   return (
//     <div className="container mx-auto p-4 border border-gray-300 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg min-h-screen">
//       <h1>PayIn</h1>
//       {/* <PaymentSettingsModal /> */}
//     </div>
//   );
// };

import { PayInTable } from "@/components/PayInTable";

// export default PayIn;
const PayIn = () => {
  return (
    <div className="container mx-auto p-4 border border-gray-300 rounded-lg shadow-lg backdrop-filter backdrop-blur-lg min-h-screen ">
      {/* <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-600">
        PayIn
      </h1> */}
      <PayInTable />
      {/* <PaymentSettingsModal /> */}
    </div>
  );
};

export default PayIn;
