import { useEffect, useState, useCallback } from "react";
import { format } from "date-fns";
import { CalendarIcon, InfoIcon, ArrowRightIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ViewService from "@/services/ViewService";

const DateSelector = ({ date, setDate }) => (
  <Popover>
    <PopoverTrigger asChild>
      <Button
        variant="outline"
        className={cn(
          "w-full justify-start text-left font-normal sm:w-[200px]",
          !date && "text-muted-foreground"
        )}
      >
        <CalendarIcon className="mr-2 h-4 w-4" />
        {date ? format(date, "dd MMM yyyy") : <span>Select date</span>}
      </Button>
    </PopoverTrigger>
    <PopoverContent className="w-auto p-0" align="start">
      <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
    </PopoverContent>
  </Popover>
);

const DashboardCard = ({ title, value, tooltip, isLoading }) => (
  <Card className="border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
    <CardHeader className="flex flex-row items-center justify-between pb-2">
      <CardTitle className="text-sm font-medium text-slate-700">
        {title}
      </CardTitle>
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <InfoIcon className="h-4 w-4 text-slate-400" />
          </TooltipTrigger>
          <TooltipContent>
            <p>{tooltip}</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
    </CardHeader>
    <CardContent>
      <div className="text-2xl font-bold text-slate-900">
        {isLoading ? <Skeleton className="h-8 w-16" /> : value}
      </div>
    </CardContent>
    <CardFooter className="border-t border-slate-100 p-2">
      <Button
        variant="ghost"
        size="sm"
        className="h-8 w-full justify-between px-2 text-xs text-blue-600"
      >
        <span>View details</span>
        <ArrowRightIcon className="h-3 w-3" />
      </Button>
    </CardFooter>
  </Card>
);

export function PaymentDashboard() {
  const [date, setDate] = useState(new Date());
  const [isLoading, setIsLoading] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    walletBalance: 0,
    totalTransactions: 0,
    successRate: 0,
    avgTransactionSize: 0,
    preferredPaymentMode: "OTHERS",
  });

  const fetchData = useCallback(async () => {
    setIsLoading(true);
    try {
      const formattedDate = format(date, "yyyy-MM-dd");
      // console.log("Formatted Date:", formattedDate); // Debugging line

      const res = await ViewService.dashboardAnalytics({ date: formattedDate });
      setDashboardData({
        walletBalance: res?.totalPayin || 0,
        totalTransactions: res?.totalTransactions || 0,
        successRate: res?.successRate || 0,
        avgTransactionSize: res?.avgTransactionSize || 0,
        preferredPaymentMode: res?.preferredPaymentMode || "OTHERS",
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  }, [date]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return (
    <div className="mx-auto max-w-7xl">
      <h1 className="mb-8 text-2xl font-bold text-slate-800">Hi Admin</h1>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <DateSelector date={date} setDate={setDate} />
        <Button
          onClick={fetchData}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? "Loading..." : "Fetch Data"}
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <DashboardCard
          title="Total PayIN"
          value={`₹${dashboardData.walletBalance.toFixed(2)}`}
          tooltip="Total amount of all transactions"
          isLoading={isLoading}
        />
        <DashboardCard
          title="Total PayOut"
          value={`₹${dashboardData.successRate.toFixed(2)}`}
          tooltip="Percentage of successful transactions"
          isLoading={isLoading}
        />
        <DashboardCard
          title="Settlement Amount"
          value={`₹${dashboardData.avgTransactionSize.toFixed(2)}`}
          tooltip="Average amount per transaction"
          isLoading={isLoading}
        />
        {/* <DashboardCard
          title="Preferred Payment Mode"
          value={dashboardData.preferredPaymentMode}
          tooltip="Most used payment method"
          isLoading={isLoading}
        /> */}
      </div>
    </div>
  );
}
