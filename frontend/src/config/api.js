// API Configuration for different environments
const BASE_URL = import.meta.env.VITE_API_URL || (import.meta.env.MODE === "development" ? "http://localhost:4000" : "/api/v1");

// Configure axios defaults
import axios from "axios";

axios.defaults.baseURL = BASE_URL;
axios.defaults.withCredentials = true;

export default axios; 