import { createContext, useContext, useState } from "react";
import { http } from "../services/http";

const AuthContext = createContext({});

export const TOKEN_NAME = "@headset-manager/token";

export function AuthProvider({ children }) {
  const [signed, setSigned] = useState(() => {
    const token = localStorage.getItem(TOKEN_NAME);

    if (token) {
      http.defaults.headers.common.Authorization = `Bearer ${token}`;
    }

    return !!token;
  });

  function logout() {
    localStorage.removeItem(TOKEN_NAME);
    setSigned(false);
  }
  function login(token) {
    localStorage.setItem("@headset-manager/token", token);
    http.defaults.headers.common.Authorization = `Bearer ${token}`;
    setSigned(true);
  }

  return (
    <AuthContext.Provider
      value={{
        signed,
        setSigned,
        logout,
        login,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const ctx = useContext(AuthContext);

  return ctx;
}
