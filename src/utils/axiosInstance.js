import axios from "axios";
// import { useRouter } from "next/router";
// import { AxiosError } from "@/utils/axioInstance/axiosError";

// export const HandleAxiosError = (err) => {
//   const router = useRouter();
//   if (!err) {
//     return;
//   }

//   if (err.code === "ERR_BAD_REQUEST") {
//     if (
//       localStorage.getItem("token") !== "undefined" &&
//       localStorage.getItem("token") !== null
//     ) {
//       localStorage.removeItem("token");
//     }
//     router.push("/login");
//   }
// };

const axiosInstance = axios.create({
  baseURL: "https://api.zanithpay.com/",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor
axiosInstance.interceptors.request.use(function (config) {
  const token = localStorage.getItem("accessToken");
  if (!token) {
    return config;
  }
  config = {
    ...config,
    headers: { ...config.headers, Authorization: `Bearer ${token}` },
  };
  return config;
});

// Add a response interceptor
axiosInstance.interceptors.response.use(
  (res) => res,
  (err) => {
    if (err.response && err.response.status === 401) {
      localStorage.removeItem("accessToken");
      window.location.href = "/login";
    }
    return Promise.reject(err);
  }
);

export { axiosInstance };