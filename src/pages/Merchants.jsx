import { TableDemo } from "@/components/merchantTable";
import { PaymentSettingsModal } from "@/components/payment-settings-modal";
import { Form } from "@/components/ui/form";
import React from "react";

const Merchants = () => {
  return (
    <div>
      <TableDemo />
      <PaymentSettingsModal />
    </div>
  );
};

export default Merchants;
