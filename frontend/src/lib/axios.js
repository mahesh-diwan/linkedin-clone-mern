import axios from "axios";

export const axiosInstance = axios.create({
  // Change this to a relative path
  baseURL: "/api/v1",
  withCredentials: true,
});
