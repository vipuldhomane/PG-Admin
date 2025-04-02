import { API_BASE_URL } from "@/config/AppConfig";
import fetch from "@/interceptor/FetchInterceptor";

// http://localhost:8000/admin-routes/adminSignup
const ViewService = {};

//LogIn Handler
ViewService.getAllMerchantDetails = async function (data) {
  return fetch({
    url: `${API_BASE_URL}/admin-routes/getAllMerchantDetails`,
    method: "get",
    data: data,
  });
};

// update merchant payment details
ViewService.updateMerchantPaymentDetails = async function (id, data) {
  return fetch({
    url: `${API_BASE_URL}/admin-routes/updateMerchantPaymentDetails/${id}`,
    method: "patch",
    data: data,
  });
};

// Get Dashborad data
ViewService.dashboardAnalytics = async function (data) {
  // console.log(data);

  return fetch({
    url: `${API_BASE_URL}/admin_dashboard/dashboard_analytics_payin`,
    method: "put",
    data: data,
  });
};

export default ViewService;
