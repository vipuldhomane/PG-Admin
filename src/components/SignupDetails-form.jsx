import { useState } from "react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import toast from "react-hot-toast";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function SignUpDetailsForm({ className, ...props }) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    businessName: "",
    businessType: "",
    phoneNumber: "",
    country: "",
  });

  const [errors, setErrors] = useState({});
  const [showOtpForm, setShowOtpForm] = useState(true);
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const validate = () => {
    const newErrors = {};
    if (formData.phoneNumber.length < 10) {
      newErrors.phoneNumber = "Phone phoneNumber should be at least 10 digits.";
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
    const token = localStorage.getItem("token");
    try {
      const response = await axios.post(
        "http://localhost:8000/merchant-routes/add_Merchant_Info",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.status === 200) {
        toast.success("Signed up successfully!");
        navigate("/login");
      } else {
        toast.error("Signup failed");
      }
    } catch (error) {
      toast.error("Error during signup");
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
            <Label htmlFor="firstName">First Name</Label>
            <Input
              id="firstName"
              type="text"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input
              id="lastName"
              type="text"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="businessName">Business Name</Label>
            <Input
              id="businessName"
              type="text"
              value={formData.businessName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="businessType">Business type</Label>
            <Input
              id="businessType"
              type="text"
              value={formData.businessType}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="country">Country</Label>
            <Input
              id="country"
              type="text"
              value={formData.country}
              onChange={handleChange}
              required
            />
          </div>
          <div className="grid gap-2">
            <Label htmlFor="phoneNumber">Number</Label>
            <Input
              id="phoneNumber"
              type="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              required
            />
            {errors.phoneNumber && (
              <p className="text-red-500">{errors.phoneNumber}</p>
            )}
          </div>

          <Button type="submit" className="w-full">
            Sign Up
          </Button>
        </div>
      </form>
    </>
  );
}
