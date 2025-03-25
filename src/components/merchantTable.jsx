import { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { getAllMerchantDetailsThunk } from "@/redux/slices/merchantDataSlice";
import { useDispatch, useSelector } from "react-redux";
import MerchantPaymentDetailsTable from "./MerchantPaymentDetailsTable";

export function TableDemo() {
  const [currentPage, setCurrentPage] = useState(1);
  const [merchants, setMerchants] = useState([]);
  // const [selectedMerchantPaymentDetails, setSelectedMerchantPaymentDetails] =
  //   useState(null);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.merchantData);

  // Fetch Data on component mount
  useEffect(() => {
    // calling api with thunk to store data in redux store
    dispatch(getAllMerchantDetailsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setMerchants(data?.merchants || []);

      setCurrentPage(1); // Reset pagination when new data is fetched
    }
  }, [data]);

  const itemsPerPage = 10;
  const totalPages = Math.max(
    1,
    Math.ceil((merchants?.length || 0) / itemsPerPage)
  );
  const paginatedMerchants = merchants?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  if (loading) {
    return <p className="text-center text-gray-500">Loading merchants...</p>;
  }

  if (error) {
    return <p className="text-center text-red-500">Error: {error}</p>;
  }
  const handleEdit = (merchantId) => {
    console.log(`Edit merchant with ID: ${merchantId}`);
    // Implement edit functionality
  };

  const handleDelete = (merchantId) => {
    console.log(`Delete merchant with ID: ${merchantId}`);
    // Implement delete functionality
  };

  const sampledata = {
    merchantId: 7,
    ipAddress: "172.29.64.1",
    firstName: "Vipul",
    lastName: "D",
    username: "16213124988",
    email: "vipultechdev@gmail.com",
    phoneNumber: "9595959595",
    country: "India",
    verifyEmail: true,
    businessName: "Vipul's Tech",
    businessType: "IT Services",
    status: "unverified",
    MerchantPaymentDetails: [
      {
        merchantId: 7,
        payinCharge: 0,
        payinStatus: "active",
        payinVendor: "10",
        payinType: "provider",
        payoutCharge: 0,
        payoutStatus: "active",
        payoutVendor: null,
        payoutType: "method",
        userType: "merchant",
        settlement: "midnight",
        source: "sharkpe",
        payoutLimit: 0,
        payinLimit: 0,
        minimumPayin: 100,
        minimumPayout: 100,
        cryptoWalletAmount: 0,
        cryptoWalletHoldAmount: 0,
        deeplink: false,
        status: "1",
      },
    ],
  };
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>A list of merchants.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Merchant ID</TableHead>

            <TableHead>IP Address</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Username</TableHead>
            {/* <TableHead>Password</TableHead> */}
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Verify Email</TableHead>
            {/* <TableHead>OTP</TableHead>
            <TableHead>Token</TableHead> */}
            <TableHead>Business Name</TableHead>
            <TableHead>Business Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Payment Details</TableHead>
            {/* <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead>Payment Details</TableHead> */}
            {/* <TableHead>Actions</TableHead> */}
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedMerchants.map((merchant) => (
            <TableRow key={merchant.merchantId}>
              <TableCell>{merchant.merchantId}</TableCell>
              <TableCell>{merchant.ipAddress || "N/A"}</TableCell>
              <TableCell>{merchant.firstName || "N/A"}</TableCell>
              <TableCell>{merchant.lastName || "N/A"}</TableCell>
              <TableCell>{merchant.username || "N/A"}</TableCell>
              {/* <TableCell>{"*".repeat(8)}</TableCell> */}
              <TableCell>{merchant.email}</TableCell>
              <TableCell>{merchant.phoneNumber || "N/A"}</TableCell>
              <TableCell>{merchant.country || "N/A"}</TableCell>
              {/* <TableCell>{merchant.otp || "N/A"}</TableCell>{" "}
              <TableCell>{merchant.token ? "Yes" : "No"}</TableCell>{" "} */}
              <TableCell>{merchant.businessName || "N/A"}</TableCell>{" "}
              <TableCell>{merchant.businessType || "N/A"}</TableCell>{" "}
              <TableCell>{merchant.businessType || "N/A"}</TableCell>
              <TableCell>{merchant.status}</TableCell>
              <TableCell>
                <MerchantPaymentDetailsTable merchantId={merchant.merchantId} />
              </TableCell>
              {/* <TableCell>
                {new Date(merchant.createdAt).toLocaleString()}
              </TableCell>
              <TableCell>
                {new Date(merchant.updatedAt).toLocaleString()}
              </TableCell> */}
              {/* <TableCell>{merchant.MerchantPaymentDetails.length}</TableCell> */}
              {/* <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem
                    // onClick={() => handleEdit(merchant.merchantId)}
                    >
                      <MerchantPaymentDetailsTable
                        merchantId={merchant.merchantId}
                      />
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleDelete(merchant.merchantId)}
                    >
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell> */}
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <div className="flex justify-between items-center mt-4">
        <Button
          onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
          disabled={currentPage === 1}
        >
          Previous
        </Button>
        <span>
          Page {currentPage} of {totalPages}
        </span>
        <Button
          onClick={() =>
            setCurrentPage((prev) => Math.min(prev + 1, totalPages))
          }
          disabled={currentPage === totalPages}
        >
          Next
        </Button>
      </div>
    </div>
  );
}
