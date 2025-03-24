import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import ViewService from "@/services/ViewService";
import toast from "react-hot-toast";
import { getAllMerchantDetailsThunk } from "@/redux/slices/merchantDataSlice";

const formSchema = z.object({
  payinCharge: z.number().min(0).max(100),
  payinStatus: z.enum(["active", "inactive"]),
  payinVendor: z.number().int().positive(),
  payinLimit: z.number().min(0),
  payoutCharge: z.number().min(0).max(100),
  payoutStatus: z.enum(["active", "inactive"]),
  payoutLimit: z.number().min(0),
  status: z.boolean(),
});

export function PaymentSettingsForm({ merchantId, paymentId }) {
  const [paymentDetails, setPaymentDetails] = useState(null);
  const dispatch = useDispatch();
  const { merchants } = useSelector((state) => state.merchantData.data);
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      payinCharge: 2.5,
      payinStatus: "active",
      payinVendor: "payU",
      payinLimit: 5000,
      payoutCharge: 1.5,
      payoutStatus: "inactive",
      payoutLimit: 10000,
      status: true,
    },
  });

  const { setValue } = form;

  // Effect to update form fields when merchant data changes
  useEffect(() => {
    if (merchants.length > 0 && merchantId) {
      const merchant = merchants.find(
        (m) => m.merchantId === Number(merchantId)
      );

      if (merchant) {
        const details = merchant.MerchantPaymentDetails[0] || null;
        setPaymentDetails(details);

        if (details) {
          setValue("payinCharge", details.payinCharge ?? 2.5);
          setValue("payinStatus", details.payinStatus ?? "active");
          setValue("payinVendor", details.payinVendor ?? "payu");
          setValue("payinLimit", details.payinLimit ?? 5000);
          setValue("payoutCharge", details.payoutCharge ?? 1.5);
          setValue("payoutStatus", details.payoutStatus ?? "inactive");
          setValue("payoutLimit", details.payoutLimit ?? 10000);
          setValue("status", details.status ?? true);
        }
      }
    }
  }, [merchants, merchantId, setValue]);

  // Submit handler to call the API
  const onSubmit = async (data) => {
    try {
      console.log("Form Data:", data); // Log form data
      const response = await ViewService.updateMerchantPaymentDetails(
        merchantId,
        data
      );
      dispatch(getAllMerchantDetailsThunk());
      toast.success("Payment settings updated successfully!");
      // Example API call using Axios

      // console.log("API Response:", response);
    } catch (error) {
      console.error("Error calling API:", error);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <FormField
          control={form.control}
          name="payinCharge"
          render={({ field }) => (
            <FormItem className="flex items-center">
              <FormLabel className="w-1/3">Pay-in Charge (%)</FormLabel>
              <FormControl className="w-2/3">
                <Input
                  type="number"
                  step="0.1"
                  {...field}
                  onChange={(e) =>
                    field.onChange(Number.parseFloat(e.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="payinStatus"
          render={({ field }) => (
            <FormItem className="flex items-center">
              <FormLabel className="w-1/3">Pay-in Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="w-2/3">
                  <SelectTrigger>
                    <SelectValue placeholder="Select pay-in status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="payinVendor"
          render={({ field }) => (
            <FormItem className="flex items-center">
              <FormLabel className="w-1/3">Pay-in Vendor</FormLabel>
              <FormControl className="w-2/3">
                <Input
                  type="number"
                  {...field}
                  onChange={(e) =>
                    field.onChange(Number.parseInt(e.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="payinLimit"
          render={({ field }) => (
            <FormItem className="flex items-center">
              <FormLabel className="w-1/3">Pay-in Limit</FormLabel>
              <FormControl className="w-2/3">
                <Input
                  type="number"
                  {...field}
                  onChange={(e) =>
                    field.onChange(Number.parseFloat(e.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="payoutCharge"
          render={({ field }) => (
            <FormItem className="flex items-center">
              <FormLabel className="w-1/3">Pay-out Charge (%)</FormLabel>
              <FormControl className="w-2/3">
                <Input
                  type="number"
                  step="0.1"
                  {...field}
                  onChange={(e) =>
                    field.onChange(Number.parseFloat(e.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="payoutStatus"
          render={({ field }) => (
            <FormItem className="flex items-center">
              <FormLabel className="w-1/3">Pay-out Status</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl className="w-2/3">
                  <SelectTrigger>
                    <SelectValue placeholder="Select pay-out status" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="payoutLimit"
          render={({ field }) => (
            <FormItem className="flex items-center">
              <FormLabel className="w-1/3">Pay-out Limit</FormLabel>
              <FormControl className="w-2/3">
                <Input
                  type="number"
                  {...field}
                  onChange={(e) =>
                    field.onChange(Number.parseFloat(e.target.value))
                  }
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="status"
          render={({ field }) => (
            <FormItem className="flex items-center">
              <FormLabel className="w-1/3">Status</FormLabel>
              <FormControl className="">
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="w-full">
          Submit
        </Button>
      </form>
    </Form>
  );
}
