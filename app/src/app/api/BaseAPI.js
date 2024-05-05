import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://api.kouiz.fr/api",
  headers: {
    'Content-Type': 'application/json',
  },
});