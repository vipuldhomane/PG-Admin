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

export function PaymentSettingsForm({ onSubmit }) {
  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      payinCharge: 2.5,
      payinStatus: "active",
      payinVendor: 123,
      payinLimit: 5000,
      payoutCharge: 1.5,
      payoutStatus: "inactive",
      payoutLimit: 10000,
      status: true,
    },
  });

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
              <FormControl className="w-2/3">
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
