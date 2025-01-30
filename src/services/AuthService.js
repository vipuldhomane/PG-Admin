import { API_BASE_URL } from "@/config/AppConfig";
import fetch from "@/interceptor/FetchInterceptor";

// http://localhost:8000/merchant-routes/merchant_Login
const AuthService = {};

//LogIn Handler
AuthService.login = async function (data) {
  return fetch({
    url: `${API_BASE_URL}/merchant-routes/merchant_Login`,
    method: "post",
    data: data,
  });
};

// SignUp Handler
AuthService.signup = async function (data) {
  return fetch({
    url: `${API_BASE_URL}/merchant-routes/Merchant_signup`,
    method: "post",
    data: data,
  });
};

//merchant-routes/merchant_Otp_verify/${merchantId}

// merchant OTP verification Handler
AuthService.verifyOTP = async function (merchantId, data) {
  return fetch({
    url: `${API_BASE_URL}/merchant-routes/merchant_Otp_verify/${merchantId}`,
    method: "post",
    data: data,
  });
};

// Add Merchant info
AuthService.addMerchantInfo = async function (data) {
  return fetch({
    url: `${API_BASE_URL}/merchant-routes/add_Merchant_Info`,
    method: "post",
    data: data,
  });
};

// Forgot Password
AuthService.forgotPassword = async function (data) {
  return fetch({
    url: `${API_BASE_URL}/merchant-routes/forgotPassword`,
    method: "patch",
    data: data,
  });
};

// Forgot Password OTP verification
AuthService.verifyOtpForPasswordReset = async function (data) {
  return fetch({
    url: `${API_BASE_URL}/merchant-routes/verifyOtpForPasswordReset`,
    method: "patch",
    data: data,
  });
};

// Reset Password
AuthService.resetPassword = async function (data) {
  return fetch({
    url: `${API_BASE_URL}/merchant-routes/resetPassword`,
    method: "patch",
    data: data,
  });
};

export default AuthService;
