"use client";
import { useEffect, useState } from "react";
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

  const fetchData = async () => {
    setIsLoading(true);

    // Simulate API call
    try {
      const res = await ViewService.dashboardAnalytics(date);
      console.log(res);
      setDashboardData({
        walletBalance: res?.totalPayin,
      });
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="mx-auto max-w-7xl">
      <div className="mb-8">
        <h1 className="text-2xl font-bold text-slate-800">Hi Admin</h1>
      </div>
      <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
              {date ? format(date, "dd MMM 'yy") : <span>Select date </span>}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={date}
              onSelect={setDate}
              initialFocus
            />
          </PopoverContent>
        </Popover>

        <Button
          onClick={fetchData}
          disabled={isLoading}
          className="bg-blue-600 hover:bg-blue-700"
        >
          {isLoading ? "Loading..." : "Fetch Data"}
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2 lg:grid-cols-3">
        <Card className="overflow-hidden border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Total Transaction Amount
            </CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="h-4 w-4 text-slate-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Total amount of all transactions</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              ₹{dashboardData.walletBalance.toFixed(2)}
            </div>
            <p className="text-xs text-slate-500">
              {dashboardData.totalTransactions} transactions
            </p>
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

        {/* <Card className="overflow-hidden border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Success Rates
            </CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="h-4 w-4 text-slate-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Percentage of successful transactions</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                `${dashboardData.successRate}%`
              )}
            </div>
            <p className="text-xs text-slate-500">0 successful txn</p>
          </CardContent>
        </Card>

        <Card className="overflow-hidden border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Avg. Transaction Size
            </CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="h-4 w-4 text-slate-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Average amount per transaction</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {isLoading ? (
                <Skeleton className="h-8 w-16" />
              ) : (
                `₹${dashboardData.avgTransactionSize}`
              )}
            </div>
          </CardContent>
        </Card> */}

        {/* <Card className="overflow-hidden border border-slate-200 bg-white shadow-sm transition-all hover:shadow-md">
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-slate-700">
              Preferred Payment Mode
            </CardTitle>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <InfoIcon className="h-4 w-4 text-slate-400" />
                </TooltipTrigger>
                <TooltipContent>
                  <p>Most used payment method</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-slate-900">
              {isLoading ? (
                <Skeleton className="h-8 w-24" />
              ) : (
                dashboardData.preferredPaymentMode
              )}
            </div>
          </CardContent>
        </Card> */}
      </div>
    </div>
  );
}
