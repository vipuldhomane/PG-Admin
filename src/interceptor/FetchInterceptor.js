import { API_BASE_URL, AUTH_TOKEN } from "@/config/AppConfig";
import axios from "axios";
import toast from "react-hot-toast";

const unauthorizedCode = [401];

const service = axios.create({
  baseURL: API_BASE_URL,
  timeout: 60000,
});

// Config
const TOKEN_PAYLOAD_KEY = "Authorization";

// API Request interceptor
service.interceptors.request.use(
  (config) => {
    const jwtToken = localStorage.getItem(AUTH_TOKEN) || null;

    if (jwtToken) {
      config.headers[TOKEN_PAYLOAD_KEY] = `Bearer ${jwtToken}`;
    }

    return config;
  },
  (error) => {
    // Do something with request error here

    // notification.error({
    //   message: "Error",
    // });
    toast.error("Error");
    Promise.reject(error);
  }
);

// Add a response interceptor
service.interceptors.response.use(
  function (response) {
    // Any status code that lie within the range of 2xx cause this function to trigger
    // Do something with response data
    return response.data;
  },
  function (error) {
    let notificationParam = {
      message: error.toString(),
    };

    // Remove token and redirect
    if (unauthorizedCode.includes(error.response.status)) {
      notificationParam.message = "Authentication Fail";
      // notificationParam.description = "Please login again";
      localStorage.removeItem(AUTH_TOKEN);

      // store.dispatch(signOutSuccess());
    }

    //if error status is 403 no notification
    if (error.response.status === 403) {
      return Promise.reject(error);
    }

    if (error.response.status === 301) {
      return Promise.reject(error);
    }

    if (error.response.status === 404) {
      console.log(error.response);
      notificationParam.message = error.response.data.message;
    }
    if (error.response.status === 400) {
      // if (window.location.href.includes("dashboards")) {
      //   return Promise.reject(error);
      // } else {
      notificationParam.message = error.response.data.message;
      // }
    }

    if (error.response.status === 500) {
      notificationParam.message = error.response.data.message;
    }

    if (error.response.status === 508) {
      notificationParam.message = error?.response?.data?.message;
    }
    if (error.response.status === 307) {
      notificationParam.message = error?.response?.data?.message;
    }
    if (error.response.status === 409) {
      notificationParam.message = error?.response?.data?.message;
    }

    toast.error(notificationParam.message);
    return Promise.reject(error);
  }
);

export default service;
