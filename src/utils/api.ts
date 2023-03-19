import axios from "axios";

const baseURL = "https://slow-benny-phantom08266.koyeb.app";

export const api = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json;charset=UTF-8",
  },
  withCredentials: true,
});
