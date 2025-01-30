import { API_BASE_URL } from "@/config/AppConfig";
import fetch from "@/interceptor/FetchInterceptor";

// http://localhost:8000/admin-routes/adminSignup
const AuthService = {};

//LogIn Handler
AuthService.login = async function (data) {
  return fetch({
    url: `${API_BASE_URL}/admin-routes/adminLogin`,
    method: "post",
    data: data,
  });
};

// SignUp Handler
AuthService.signup = async function (data) {
  return fetch({
    url: `${API_BASE_URL}/admin-routes/adminSignup`,
    method: "post",
    data: data,
  });
};

// Forgot Password
AuthService.forgotPassword = async function (data) {
  return fetch({
    url: `${API_BASE_URL}/admin-routes/forgotPassword`,
    method: "post",
    data: data,
  });
};

// Forgot Password OTP verification
AuthService.verifyOtpForPasswordReset = async function (data) {
  return fetch({
    url: `${API_BASE_URL}/admin-routes/verifyOtp`,
    method: "post",
    data: data,
  });
};

// Reset Password
AuthService.resetPassword = async function (data) {
  return fetch({
    url: `${API_BASE_URL}/admin-routes/resetPassword`,
    method: "patch",
    data: data,
  });
};

export default AuthService;
