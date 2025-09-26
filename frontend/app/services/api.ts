import axios from "axios";

/**
 * Shared Axios instance for the app.
 * During local dev, backend runs at http://localhost:3000
 */
export const api = axios.create({
  baseURL: "http://localhost:3000"
});
