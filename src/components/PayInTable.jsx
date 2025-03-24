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
import ViewService from "@/services/ViewService";
import { getAllMerchantDetailsThunk } from "@/redux/slices/merchantDataSlice";
import { useDispatch, useSelector } from "react-redux";
import MerchantPaymentDetailsTable from "./MerchantPaymentDetailsTable";

export function PayInTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [merchants, setMerchants] = useState([]);
  const [selectedMerchantPaymentDetails, setSelectedMerchantPaymentDetails] =
    useState(null);
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.merchantData);

  const dummyData = [
    {
      id: 1317829,
      user_id: "110",
      amount: 300,
      charges: 12.39,
      mode: "INR",
      status: 1,
      source: "payin",
      deeplink: "1",
      linkOpen: "0",
      expire_on: "1741684646460",
      transaction_id: "SHKPE469a0e4ea69e4297",
      transaction_hash:
        "37ae34820cd917bb736e1f5b61b1d9438b93150e956fb21889afcc357730a553",
      partner_txn_id: "I0100202503111899385413736230912",
      vendor_txn_id: null,
      redirection: 0,
      createdAt: "2025-03-11 14:33:24",
      updatedAt: "2025-03-11 14:33:24",
      "method.vendor": "abhi cashfree",
      "user.fname": "Kirch",
      "user.lname": "Serve",
    },
    {
      id: 1317829,
      user_id: "110",
      amount: 300,
      charges: 12.39,
      mode: "INR",
      status: 1,
      source: "payin",
      deeplink: "1",
      linkOpen: "0",
      expire_on: "1741684646460",
      transaction_id: "SHKPE469a0e4ea69e4297",
      transaction_hash:
        "37ae34820cd917bb736e1f5b61b1d9438b93150e956fb21889afcc357730a553",
      partner_txn_id: "I0100202503111899385413736230912",
      vendor_txn_id: null,
      redirection: 0,
      createdAt: "2025-03-11 14:33:24",
      updatedAt: "2025-03-11 14:33:24",
      "method.vendor": "abhi cashfree",
      "user.fname": "Kirch",
      "user.lname": "Serve",
    },
    {
      id: 1317829,
      user_id: "110",
      amount: 300,
      charges: 12.39,
      mode: "INR",
      status: 1,
      source: "payin",
      deeplink: "1",
      linkOpen: "0",
      expire_on: "1741684646460",
      transaction_id: "SHKPE469a0e4ea69e4297",
      transaction_hash:
        "37ae34820cd917bb736e1f5b61b1d9438b93150e956fb21889afcc357730a553",
      partner_txn_id: "I0100202503111899385413736230912",
      vendor_txn_id: null,
      redirection: 0,
      createdAt: "2025-03-11 14:33:24",
      updatedAt: "2025-03-11 14:33:24",
      "method.vendor": "abhi cashfree",
      "user.fname": "Kirch",
      "user.lname": "Serve",
    },
    {
      id: 1317829,
      user_id: "110",
      amount: 300,
      charges: 12.39,
      mode: "INR",
      status: 1,
      source: "payin",
      deeplink: "1",
      linkOpen: "0",
      expire_on: "1741684646460",
      transaction_id: "SHKPE469a0e4ea69e4297",
      transaction_hash:
        "37ae34820cd917bb736e1f5b61b1d9438b93150e956fb21889afcc357730a553",
      partner_txn_id: "I0100202503111899385413736230912",
      vendor_txn_id: null,
      redirection: 0,
      createdAt: "2025-03-11 14:33:24",
      updatedAt: "2025-03-11 14:33:24",
      "method.vendor": "abhi cashfree",
      "user.fname": "Kirch",
      "user.lname": "Serve",
    },
    {
      id: 1317829,
      user_id: "110",
      amount: 300,
      charges: 12.39,
      mode: "INR",
      status: 1,
      source: "payin",
      deeplink: "1",
      linkOpen: "0",
      expire_on: "1741684646460",
      transaction_id: "SHKPE469a0e4ea69e4297",
      transaction_hash:
        "37ae34820cd917bb736e1f5b61b1d9438b93150e956fb21889afcc357730a553",
      partner_txn_id: "I0100202503111899385413736230912",
      vendor_txn_id: null,
      redirection: 0,
      createdAt: "2025-03-11 14:33:24",
      updatedAt: "2025-03-11 14:33:24",
      "method.vendor": "abhi cashfree",
      "user.fname": "Kirch",
      "user.lname": "Serve",
    },
    {
      id: 1317829,
      user_id: "110",
      amount: 300,
      charges: 12.39,
      mode: "INR",
      status: 1,
      source: "payin",
      deeplink: "1",
      linkOpen: "0",
      expire_on: "1741684646460",
      transaction_id: "SHKPE469a0e4ea69e4297",
      transaction_hash:
        "37ae34820cd917bb736e1f5b61b1d9438b93150e956fb21889afcc357730a553",
      partner_txn_id: "I0100202503111899385413736230912",
      vendor_txn_id: null,
      redirection: 0,
      createdAt: "2025-03-11 14:33:24",
      updatedAt: "2025-03-11 14:33:24",
      "method.vendor": "abhi cashfree",
      "user.fname": "Kirch",
      "user.lname": "Serve",
    },
    {
      id: 1317829,
      user_id: "110",
      amount: 300,
      charges: 12.39,
      mode: "INR",
      status: 1,
      source: "payin",
      deeplink: "1",
      linkOpen: "0",
      expire_on: "1741684646460",
      transaction_id: "SHKPE469a0e4ea69e4297",
      transaction_hash:
        "37ae34820cd917bb736e1f5b61b1d9438b93150e956fb21889afcc357730a553",
      partner_txn_id: "I0100202503111899385413736230912",
      vendor_txn_id: null,
      redirection: 0,
      createdAt: "2025-03-11 14:33:24",
      updatedAt: "2025-03-11 14:33:24",
      "method.vendor": "abhi cashfree",
      "user.fname": "Kirch",
      "user.lname": "Serve",
    },
    {
      id: 1317829,
      user_id: "110",
      amount: 300,
      charges: 12.39,
      mode: "INR",
      status: 1,
      source: "payin",
      deeplink: "1",
      linkOpen: "0",
      expire_on: "1741684646460",
      transaction_id: "SHKPE469a0e4ea69e4297",
      transaction_hash:
        "37ae34820cd917bb736e1f5b61b1d9438b93150e956fb21889afcc357730a553",
      partner_txn_id: "I0100202503111899385413736230912",
      vendor_txn_id: null,
      redirection: 0,
      createdAt: "2025-03-11 14:33:24",
      updatedAt: "2025-03-11 14:33:24",
      "method.vendor": "abhi cashfree",
      "user.fname": "Kirch",
      "user.lname": "Serve",
    },
  ];

  // Fetch Data on component mount
  useEffect(() => {
    // calling api with thunk to store data in redux store
    dispatch(getAllMerchantDetailsThunk());
  }, [dispatch]);

  useEffect(() => {
    if (data) {
      setMerchants(dummyData); // Use dummy data directly
      setCurrentPage(1); // Reset pagination when new data is fetched
    }
  }, [data]);

  const itemsPerPage = 5;
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

  return (
    <div className="overflow-x-auto">
      <Table>
        <TableCaption>A list of merchants.</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Merchant ID</TableHead>
            {/* <TableHead>Payment Details</TableHead> */}
            <TableHead>IP Address</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Username</TableHead>
            <TableHead>Email</TableHead>
            <TableHead>Phone Number</TableHead>
            <TableHead>Country</TableHead>
            <TableHead>Verify Email</TableHead>
            <TableHead>OTP</TableHead>
            <TableHead>Token</TableHead>
            <TableHead>Business Name</TableHead>
            <TableHead>Business Type</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Updated At</TableHead>
            <TableHead>Payment Details</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {paginatedMerchants.map((merchant) => (
            <TableRow key={merchant.id}>
              <TableCell>{merchant.id}</TableCell>
              {/* <TableCell>
                <MerchantPaymentDetailsTable merchantId={merchant.id} />
              </TableCell> */}
              <TableCell>{merchant.ipAddress || "N/A"}</TableCell>
              <TableCell>{merchant["user.fname"] || "N/A"}</TableCell>
              <TableCell>{merchant["user.lname"] || "N/A"}</TableCell>
              <TableCell>{merchant.user_id || "N/A"}</TableCell>
              <TableCell>{merchant.email || "N/A"}</TableCell>
              <TableCell>{merchant.phoneNumber || "N/A"}</TableCell>
              <TableCell>{merchant.country || "N/A"}</TableCell>
              <TableCell>{merchant.otp || "N/A"}</TableCell>
              <TableCell>{merchant.token ? "Yes" : "No"}</TableCell>
              <TableCell>{merchant.businessName || "N/A"}</TableCell>
              <TableCell>{merchant.businessType || "N/A"}</TableCell>
              <TableCell>{merchant.status}</TableCell>
              <TableCell>
                {new Date(merchant.createdAt).toLocaleString()}
              </TableCell>
              <TableCell>
                {new Date(merchant.updatedAt).toLocaleString()}
              </TableCell>
              <TableCell>{merchant.amount}</TableCell>
              <TableCell>
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" className="h-8 w-8 p-0">
                      <span className="sr-only">Open menu</span>
                      <MoreHorizontal className="h-4 w-4" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem onClick={() => handleEdit(merchant.id)}>
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={() => handleDelete(merchant.id)}>
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </TableCell>
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
