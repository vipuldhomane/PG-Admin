import { useState, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { X, Edit } from "lucide-react";
import { useSelector } from "react-redux";
import { PaymentSettingsModal } from "./payment-settings-modal";

const MerchantPaymentDetailsTable = ({ merchantId }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [paymentDetails, setPaymentDetails] = useState(null);
  const { merchants } = useSelector((state) => state.merchantData.data);

  useEffect(() => {
    if (merchants.length > 0 && merchantId) {
      // Find the merchant with the given merchantId
      const merchant = merchants.find(
        (m) => m.merchantId === Number(merchantId)
      );

      if (merchant) {
        setPaymentDetails(merchant.MerchantPaymentDetails[0] || []);
      }
    }
    // console.log("merchants", merchants);
    // console.log(paymentDetails?.MerchantPaymentDetails_Id);
  }, [merchants, merchantId]);

  // useEffect(() => {
  //   const fetchData = async () => {
  //     try {
  //       const response = await ViewService.getMerchantPaymentDetails()
  //       if (response && response.MerchantPaymentDetails && response.MerchantPaymentDetails.length > 0) {
  //         setPaymentDetails(response.MerchantPaymentDetails[0])
  //       }
  //     } catch (error) {
  //       console.error("Error fetching merchant payment details:", error)
  //     }
  //   }
  //   fetchData()
  // }, [])

  const handleOpenChange = (open) => {
    // Only allow closing via the close button
    if (!open) return;
    setIsOpen(open);
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    });
  };

  const handleEdit = () => {
    setIsEditDialogOpen(true);
  };

  if (!paymentDetails) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogTrigger asChild>
          <Button className="bg-blue-500" onClick={() => setIsOpen(true)}>
            Payment Details
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-[90vw] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex justify-between items-center">
              Merchant Payment Details
              <div>
                {/* <Button
                  variant="outline"
                  size="icon"
                  onClick={handleEdit}
                  className="mr-2"
                >
                  <Edit className="h-4 w-4" />
                </Button> */}
                <PaymentSettingsModal
                  merchantId={merchantId}
                  paymentId={paymentDetails.MerchantPaymentDetails_Id}
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsOpen(false)}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </DialogTitle>
          </DialogHeader>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Field</TableHead>
                  <TableHead>Value</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {Object.entries(paymentDetails).map(([key, value]) => (
                  <TableRow key={key}>
                    <TableCell className="font-medium">{key}</TableCell>
                    <TableCell>
                      {key === "createdAt" || key === "updatedAt"
                        ? formatDate(value)
                        : typeof value === "boolean"
                        ? value.toString()
                        : value === null
                        ? "N/A"
                        : typeof value === "number"
                        ? value.toFixed(2)
                        : value}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </DialogContent>
      </Dialog>

      {/* Placeholder for Edit Dialog */}
      <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
        {/* <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Merchant Payment Details</DialogTitle>
          </DialogHeader>

          <p>Your edit form content goes here.</p>
          <Button onClick={() => setIsEditDialogOpen(false)}>Close</Button>
        </DialogContent> */}
      </Dialog>
    </>
  );
};

export default MerchantPaymentDetailsTable;
