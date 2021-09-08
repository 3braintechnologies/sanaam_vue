import axios from "axios";
import { Constants } from "./constant";
import router from "../router";

const domainUrl = process.env.REACT_APP_API_URL || Constants.BASE_URL;

const apiInstance = axios.create({
  baseURL: domainUrl,
  headers: { "Content-Type": "application/json" },
  timeout: 1000 * 60 * 1.5,
});

apiInstance.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("token");
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

apiInstance.interceptors.response.use(
  async function(response) {
    return response;
  },
  async function(error) {
    if (
      error &&
      error.response &&
      error.response.status &&
      error.response.status === 401 &&
      localStorage.getItem("token")
    ) {
      const originalRequest = error.response.config;

      if (!originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const res = await refreshAccessToken();
          if (res && res.data && res.data.data && res.data.data.token) {
            localStorage.setItem("token", res.data.data.token);
            return apiInstance(originalRequest);
          } else {
            await expireUserToken();
            return error.response;
          }
        } catch (e) {
          await expireUserToken();
          console.log("Refresh Token Catch", e);
          return error.response;
        }
      } else {
        await expireUserToken();
        return error.response;
      }
    } else {
      return {
        status: 500,
        data: {
          code: 500,
          message: error?.response?.data?.message
            ? error.response.data.message
            : error?.message
            ? error.message
            : Constants.ERROR.INTERNAL_SERVER,
          details: {},
        },
      };
    }
  }
);

const refreshAccessToken = () => {
  console.log("Refresh Token");
  const url = domainUrl + `/auth/refresh-token`;
  const result = axios.post(url, { token: localStorage.getItem("token") });
  return result;
};

const expireUserToken = () =>
  new Promise((resolve) => {
    localStorage.clear();
    router.replace("/");
    resolve(true);
  });

export default apiInstance;
