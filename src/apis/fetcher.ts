import axios from "axios";
import type { InternalAxiosRequestConfig } from "axios";
import { TOKEN_CYBERSOFT, API_BASE_URL } from "../constants/config";
import { LOCAL_USER } from "../constants/config";

// fetcher function
const fetcher = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    tokencybersoft: TOKEN_CYBERSOFT,
  },
});

// interceptor
fetcher.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  // console.log("request config object:", config);
  let token = "";
  try {
    const user = JSON.parse(localStorage.getItem(LOCAL_USER) || "null");
    if (user) console.log("there is user:", user);
    if (!user) console.log("there is not user");
    token = user?.accessToken || "";

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  } catch (error) {
    console.log("interceptor request error:", error);
    throw error;
  }

  return config;
});

export default fetcher;

/** config: InternalAxiosRequestConfig
 * + In typescript with the type import, we need to return the exact config object that Axios give us
 * + InternalAxiosRequestConfig has hidden internal properties that won't be copy
 * + if return the shallow copy => Break axios internally
 * + so mutate the object property direct and return the original config object
 */
