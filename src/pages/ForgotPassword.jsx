import { GalleryVerticalEnd } from "lucide-react";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import toast from "react-hot-toast";
import axios from "axios";

export default function ForgotPasswordPage() {
  const [formData, setFormData] = useState({ email: "" });
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleOtpChange = (e) => {
    setOtp(e.target.value);
  };

  const handleNewPasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        "http://localhost:8000/merchant-routes/forgotPassword",
        formData
      );
      if (response.status === 200) {
        toast.success("Password reset OTP sent!");
        setOtpSent(true);
      } else {
        toast.error("Password reset failed");
      }
    } catch (error) {
      toast.error("Error during password reset");
    }
  };

  const handleOtpSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        "http://localhost:8000/merchant-routes/verifyOtpForPasswordReset",
        { email: formData.email, otp }
      );
      if (response.status === 200) {
        toast.success("OTP verified successfully!");
        setOtpVerified(true);
      } else {
        toast.error("OTP verification failed");
      }
    } catch (error) {
      toast.error("Error during OTP verification");
    }
  };

  const handleNewPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.patch(
        "http://localhost:8000/merchant-routes/resetPassword",
        { email: formData.email, newPassword }
      );
      if (response.status === 200) {
        toast.success("Password reset successfully!");
        navigate("/login");
      } else {
        toast.error("Password reset failed");
      }
    } catch (error) {
      toast.error("Error during password reset");
    }
  };

  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
        <div className="flex justify-center gap-2 md:justify-start">
          <a href="#" className="flex items-center gap-2 font-medium">
            <div className="flex h-6 w-6 items-center justify-center rounded-md bg-primary text-primary-foreground">
              <GalleryVerticalEnd className="size-4" />
            </div>
            Kurmato Payment Gateway
          </a>
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <form className={cn("flex flex-col gap-6")} onSubmit={handleSubmit}>
              <div className="flex flex-col items-center gap-2 text-center">
                <h1 className="text-2xl font-bold">Reset Password</h1>
                <p className="text-balance text-sm text-muted-foreground">
                  Enter your email below to reset your password
                </p>
              </div>
              <div className="grid gap-6">
                <div className="grid gap-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="m@example.com"
                    required
                  />
                </div>
                <Button type="submit" className="w-full" disabled={otpSent}>
                  Send OTP
                </Button>
              </div>
            </form>

            {otpSent && !otpVerified && (
              <form
                onSubmit={handleOtpSubmit}
                className={cn("flex flex-col gap-6 mt-6")}
              >
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="otp">Enter OTP</Label>
                    <Input
                      id="otp"
                      type="text"
                      value={otp}
                      onChange={handleOtpChange}
                      maxLength="6"
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Verify OTP
                  </Button>
                </div>
              </form>
            )}

            {otpVerified && (
              <form
                onSubmit={handleNewPasswordSubmit}
                className={cn("flex flex-col gap-6 mt-6")}
              >
                <div className="grid gap-6">
                  <div className="grid gap-2">
                    <Label htmlFor="newPassword">New Password</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      value={newPassword}
                      onChange={handleNewPasswordChange}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Reset Password
                  </Button>
                </div>
              </form>
            )}

            <div className="text-center text-sm">
              Go back to{" "}
              <a href="/login" className="underline underline-offset-4">
                Login
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="https://img.freepik.com/free-photo/3d-render-secure-login-password-illustration_107791-16640.jpg?t=st=1736926929~exp=1736930529~hmac=81e324098160329ee499c961e2b5fb98b83433f6f2216e38a9788f818d2f7b88&w=740"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  );
}
