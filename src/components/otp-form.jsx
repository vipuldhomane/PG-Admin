import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export function OTPForm({ onSubmit, merchantId }) {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (otp.length !== 6) {
      toast.error("OTP must be 6 digits");
      return;
    }
    try {
      const response = await axios.post(
        `http://localhost:8000/merchant-routes/merchant_Otp_verify/${merchantId}`,
        {
          otp,
        }
      );

      if (response.data.message === "Email successfully verified") {
        console.log(response.data);
        localStorage.setItem("token", response.data.token);
        toast.success("OTP verified successfully!");
        onSubmit();
        navigate("/signupdetails");
      } else {
        toast.error("Invalid OTP");
      }
    } catch (error) {
      toast.error("Error verifying OTP");
    }
  };

  return (
    <form className="flex flex-col gap-6 mt-2" onSubmit={handleSubmit}>
      <div className="grid gap-2">
        <Label htmlFor="otp">Enter OTP</Label>
        <Input
          id="otp"
          type="text"
          value={otp}
          onChange={handleChange}
          required
        />
      </div>
      <Button type="submit" className="w-full">
        Submit OTP
      </Button>
    </form>
  );
}
