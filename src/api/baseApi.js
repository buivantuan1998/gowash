import axios from "axios";
import { BASE_URL } from "@/env";
import { AppStorage } from "@/storage/app_storate";

const baseApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

export const fetchApi = async (endpoint, method = "GET", body = null) => {
  try {
    const response = await baseApi({
      url: endpoint,
      method,
      data: body,
    });
    return response.data;
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
};

export const GetApi = async (endpoint) => {
  const tokenUser = await AppStorage.getTokenUser();
  let header = {};
  if (tokenUser) {
    header = {
      Authorization: `Bearer ${tokenUser}`,
    };
  }
  try {
    const response = await baseApi.get(endpoint, {
      headers: header,
    });
    console.log("API call response:", response);
    return response.data;
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
};

export const PostApi = async (endpoint, data = {}) => {
  const tokenUser = await AppStorage.getTokenUser();

  console.log('tokenUser: ', tokenUser);
  let header = {};
  if (tokenUser) {
    header = {
      Authorization: `Bearer ${tokenUser}`,
    };
  }
  try {
    const response = await baseApi.post(endpoint, data, {
      headers: header,
    });
    console.log("API call response:", response);
    return response.data;
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
};
