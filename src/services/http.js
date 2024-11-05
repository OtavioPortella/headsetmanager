import axios from "axios";
import { TOKEN_NAME } from "../contexts/AuthContext";

export const http = axios.create({
  baseURL: "http://localhost:3000",
});

http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (
      error.response?.status === 401 &&
      error.response?.data?.error === "Token inválido"
    ) {
      // Since we can't directly import useAuth hook here,
      // we'll need to clear localStorage and reload the page
      localStorage.removeItem(TOKEN_NAME);
      window.location.reload();
    }
    return Promise.reject(error);
  },
);
