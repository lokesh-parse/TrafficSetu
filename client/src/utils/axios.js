import axios from "axios";

const API = axios.create({
  baseURL: "https://trafficsetu.onrender.com/api",
  withCredentials: true,
});

export default API;