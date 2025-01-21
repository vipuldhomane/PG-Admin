import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function OTPForm({ onSubmit }) {
  const [otp, setOtp] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setOtp(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Call the API to verify OTP
    toast.success("OTP verified successfully!");
    onSubmit();
    navigate("/login");
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
