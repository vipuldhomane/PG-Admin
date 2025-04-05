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
import ViewService from "@/services/ViewService";

export function PayOutTable() {
  const [currentPage, setCurrentPage] = useState(1);
  const [transactions, setTransactions] = useState([]);
  const [transactionType, setTransactionType] = useState("1"); // Default to successful transactions

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await ViewService.getAllTransactions({
          source: "payout",
          status: transactionType,
        });

        console.log(response);
        setTransactions(response?.transactions || []);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [transactionType]);

  const itemsPerPage = 5;
  const totalPages = Math.max(
    1,
    Math.ceil((transactions?.length || 0) / itemsPerPage)
  );
  const paginatedTransactions = transactions?.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  return (
    <div className="overflow-x-auto p-1">
      <div className="flex justify-center gap-4 mb-4">
        <Button
          className={`px-6 py-2 rounded-lg text-white ${
            transactionType === "1" ? "bg-green-400" : "bg-gray-300"
          }`}
          onClick={() => setTransactionType("1")}
        >
          Successful Transactions
        </Button>
        <Button
          className={`px-6 py-2 rounded-lg text-white ${
            transactionType === "0" ? "bg-red-400" : "bg-gray-300"
          }`}
          onClick={() => setTransactionType("0")}
        >
          Failed Transactions
        </Button>
      </div>
      <div className="min-h-[400px] border border-gray-100 rounded-md shadow-lg bg-gray-50 backdrop-blur-md bg-opacity-80 hover:shadow-md transition-shadow duration-300">
        <Table>
          {/* <TableCaption>PayIn Transactions</TableCaption> */}
          {paginatedTransactions.length > 0 ? (
            <>
              <TableHeader>
                <TableRow>
                  <TableHead>Txn ID</TableHead>
                  <TableHead>MID</TableHead>
                  <TableHead>Amount</TableHead>
                  <TableHead>Mode</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Source</TableHead>
                  <TableHead>Partner TXN ID</TableHead>
                  <TableHead>IP Address</TableHead>
                  <TableHead>Callback URL</TableHead>
                  <TableHead>Webhook URL</TableHead>
                  <TableHead>Time</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {paginatedTransactions.map((transaction) => (
                  <TableRow key={transaction.id}>
                    <TableCell>{transaction.id}</TableCell>
                    <TableCell>{transaction.merchantId}</TableCell>
                    <TableCell>{transaction.amount}</TableCell>
                    <TableCell>{transaction.mode}</TableCell>
                    <TableCell>
                      <span
                        className={`px-2 py-1 rounded-lg text-white ${
                          transaction.status == 1
                            ? "bg-green-500"
                            : "bg-red-500"
                        }`}
                      >
                        {transaction.status == 1 ? "Success" : "Failed"}
                      </span>
                    </TableCell>
                    <TableCell>{transaction.source}</TableCell>
                    <TableCell>{transaction.partner_txn_id}</TableCell>
                    <TableCell>{transaction.ip}</TableCell>
                    <TableCell>{transaction.callback_url}</TableCell>
                    <TableCell>{transaction.webhook_url}</TableCell>
                    <TableCell>
                      {new Date(transaction.createdAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </>
          ) : (
            <TableBody>
              <TableRow>
                <TableCell colSpan="11" className="text-center py-10">
                  No transactions found
                </TableCell>
              </TableRow>
            </TableBody>
          )}
        </Table>
      </div>
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
