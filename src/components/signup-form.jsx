import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import { OTPForm } from "./otp-form";

export function SignUpForm({ className, ...props }) {
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    username: "",
    number: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [showOtpForm, setShowOtpForm] = useState(true);

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (formData.number.length < 10) {
      newErrors.number = "Phone number should be at least 10 digits.";
    }
    if (formData.password.length < 6) {
      newErrors.password = "Password should be at least 6 characters.";
    }
    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    toast.success("Form submitted successfully!");
    setShowOtpForm(true);
    // Call the API with formData
    // try {
    //   const response = await fetch("/api/signup", {
    //     method: "POST",
    //     headers: {
    //       "Content-Type": "application/json",
    //     },
    //     body: JSON.stringify(formData),
    //   });
    //   const result = await response.json();
    //   console.log(result);
    // } catch (error) {
    //   console.error("Error:", error);
    // }
  };

  return (
    <>
      <form
        className={cn("flex flex-col gap-6", className)}
        onSubmit={handleSubmit}
        {...props}
      >
        <div className="flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-bold">Sign Up to your account</h1>
        </div>
        <div className="grid gap-6">
          <div className="grid gap-2">
            <Label htmlFor="firstname">First Name</Label>
            <Input
              id="firstname"
              type="text"
              value={formData.firstname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastname">Last Name</Label>
            <Input
              id="lastname"
              type="text"
              value={formData.lastname}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="number">Number</Label>
            <Input
              id="number"
              type="number"
              value={formData.number}
              onChange={handleChange}
              required
            />
            {errors.number && <p className="text-red-500">{errors.number}</p>}
          </div>
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
          </div>
          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </div>
      </form>
      {showOtpForm && <OTPForm onSubmit={() => setShowOtpForm(false)} />}
      <div className="text-center text-sm ">
        Already have an account?{" "}
        <a href="/login" className="underline underline-offset-4">
          Log in
        </a>
      </div>
    </>
  );
}
