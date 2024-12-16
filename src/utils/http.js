import { axiosInstance } from "./axiosInstance";

const GetAPI = async (url) => {
  const headers = {
    "Content-Type": "application/json",
  };

  const response = await axiosInstance.get(url, {
    headers,
  });

  return response;
};

function apiGet(url, params = {}) {
  return axiosInstance.get(url, { params });
}

function apiPost(url, body, contentType = "application/json") {
  const headers = {
    "Content-Type": contentType,
  };

  return axiosInstance.post(url, body, {
    headers,
  });
}

function apiPut(url, body, contentType = "application/json") {
  const headers = {
    "Content-Type": contentType,
  };

  return axiosInstance.put(url, body, {
    headers,
  });
}

function apiPatch(url, body) {
  return axiosInstance.patch(url, body);
}

function apiDelete(url) {
  return axiosInstance.delete(url);
}

export { apiGet, apiPost, apiPut, apiPatch, apiDelete, GetAPI };