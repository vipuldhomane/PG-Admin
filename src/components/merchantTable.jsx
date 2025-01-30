import { useState } from "react";
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

const merchants = [
  {
    merchantId: 1,
    ipAddress: "196.245.201.38",
    firstName: null,
    lastName: null,
    username: null,
    password: "$2b$10$JlRQ67uZVtAYs5Wr20v9ru5scdtOjikmSJbG.E7lrJQ2NKBBWRXte",
    email: "alt.ho-1l15sis7i@yopmail.com",
    phoneNumber: null,
    country: null,
    verifyEmail: true,
    otp: null,
    token: null,
    businessName: null,
    businessType: null,
    status: "unverified",
    createdAt: "2025-01-22T02:33:07.000Z",
    updatedAt: "2025-01-22T02:33:07.000Z",
    MerchantPaymentDetails: [],
  },
  {
    merchantId: 1,
    ipAddress: null,
    firstName: null,
    lastName: null,
    username: null,
    password: "$2b$10$JlRQ67uZVtAYs5Wr20v9ru5scdtOjikmSJbG.E7lrJQ2NKBBWRXte",
    email: "alt.ho-1l15sis7i@yopmail.com",
    phoneNumber: null,
    country: null,
    verifyEmail: true,
    otp: null,
    token: null,
    businessName: null,
    businessType: null,
    status: "unverified",
    createdAt: "2025-01-22T02:33:07.000Z",
    updatedAt: "2025-01-22T02:33:07.000Z",
    MerchantPaymentDetails: [],
  },
  {
    merchantId: 1,
    ipAddress: null,
    firstName: null,
    lastName: null,
    username: null,
    password: "$2b$10$JlRQ67uZVtAYs5Wr20v9ru5scdtOjikmSJbG.E7lrJQ2NKBBWRXte",
    email: "alt.ho-1l15sis7i@yopmail.com",
    phoneNumber: null,
    country: null,
    verifyEmail: true,
    otp: null,
    token: null,
    businessName: null,
    businessType: null,
    status: "unverified",
    createdAt: "2025-01-22T02:33:07.000Z",
    updatedAt: "2025-01-22T02:33:07.000Z",
    MerchantPaymentDetails: [],
  },
  {
    merchantId: 1,
    ipAddress: null,
    firstName: null,
    lastName: null,
    username: null,
    password: "$2b$10$JlRQ67uZVtAYs5Wr20v9ru5scdtOjikmSJbG.E7lrJQ2NKBBWRXte",
    email: "alt.ho-1l15sis7i@yopmail.com",
    phoneNumber: null,
    country: null,
    verifyEmail: true,
    otp: null,
    token: null,
    businessName: null,
    businessType: null,
    status: "unverified",
    createdAt: "2025-01-22T02:33:07.000Z",
    updatedAt: "2025-01-22T02:33:07.000Z",
    MerchantPaymentDetails: [],
  },
  // Add more merchant entries here
];

export function TableDemo() {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;
  const totalPages = Math.ceil(merchants.length / itemsPerPage);

  const paginatedMerchants = merchants.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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
            <TableHead>IP Address</TableHead>
            <TableHead>First Name</TableHead>
            <TableHead>Last Name</TableHead>
            <TableHead>Username</TableHead>
            {/* <TableHead>Password</TableHead> */}
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
              <TableCell>{merchant.verifyEmail ? "Yes" : "No"}</TableCell>
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
              <TableCell>{merchant.MerchantPaymentDetails.length}</TableCell>
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
                    <DropdownMenuItem
                      onClick={() => handleEdit(merchant.merchantId)}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem
                      onClick={() => handleDelete(merchant.merchantId)}
                    >
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
