import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PaymentSettingsForm } from "./payment-settings-form";

export function PaymentSettingsModal({ merchantId, paymentId }) {
  const [open, setOpen] = useState(false);

  const handleSubmit = (values) => {
    console.log(values);
    setOpen(false);
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline">Open Payment Settings</Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Payment Settings</DialogTitle>
          <DialogDescription>
            Update your payment settings here. Click submit when you're done.
          </DialogDescription>
        </DialogHeader>
        <PaymentSettingsForm
          onSubmit={handleSubmit}
          merchantId={merchantId}
          paymentId={paymentId}
        />
      </DialogContent>
    </Dialog>
  );
}
