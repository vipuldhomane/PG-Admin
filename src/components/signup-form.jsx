import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { OTPForm } from "./otp-form";
// import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { signupUserThunk } from "@/redux/slices/authSlice";
import { useNavigate } from "react-router-dom";

export function SignUpForm({ className, ...props }) {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
  });

  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
    if (id === "password" && value.length < 8) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: "Password should be at least 8 characters.",
      }));
    } else if (id === "password") {
      setErrors((prevErrors) => {
        const { password, ...rest } = prevErrors;
        return rest;
      });
    }
    if (id === "confirmPassword" && value !== formData.password) {
      setErrors((prevErrors) => ({
        ...prevErrors,
        confirmPassword: "Passwords do not match.",
      }));
    } else if (id === "confirmPassword") {
      setErrors((prevErrors) => {
        const { confirmPassword, ...rest } = prevErrors;
        return rest;
      });
    }
  };

  const validate = () => {
    const newErrors = {};
    if (formData.password.length < 8) {
      newErrors.password = "Password should be at least 8 characters.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    return newErrors;
  };

  const isFormValid = () => {
    return (
      formData.email &&
      formData.password &&
      formData.confirmPassword &&
      formData.password === formData.confirmPassword
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      setIsSubmitting(false);
      return;
    }
    setErrors({});
    try {
      const response = await dispatch(
        signupUserThunk({ email: formData.email, password: formData.password })
      ).unwrap();

      if (response) {
        toast.success("Signup successful");
        navigate("/login");
        // setShowOtpForm(true);
      } else {
        toast.error("Signup failed");
      }
    } catch (error) {
      // toast.error("Error during signup");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <form
        className={cn("flex flex-col gap-6", className)}
        onSubmit={handleSubmit}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Enter your details</h1>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            {errors.password && (
              <p className="text-red-500">{errors.password}</p>
            )}
          </div>
          <div className="grid gap-2">
            <Label htmlFor="confirmPassword">Confirm Password</Label>
            <Input
              id="confirmPassword"
              type="password"
              value={formData.confirmPassword}
              onChange={handleChange}
              required
            />
            {errors.confirmPassword && (
              <p className="text-red-500">{errors.confirmPassword}</p>
            )}
            {!errors.confirmPassword && formData.confirmPassword && (
              <p className="text-green-500">Passwords match</p>
            )}
          </div>
          <Button
            type="submit"
            className="w-full"
            disabled={!isFormValid() || showOtpForm}
          >
            {isSubmitting
              ? "Submitting..."
              : showOtpForm
              ? "OTP Sent"
              : "Sign Up"}
          </Button>
        </div>
      </form>
      <div className="text-center text-sm ">
        Already have an account?{" "}
        <a href="/login" className="underline underline-offset-4">
          Log in
        </a>
      </div>
      {/* <div className="mt-10">
        {showOtpForm && (
          <OTPForm
            merchantId={merchantId}
            onSubmit={() => setShowOtpForm(false)}
          />
        )}
      </div> */}
    </>
  );
}
