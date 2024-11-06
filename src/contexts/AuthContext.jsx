import { createContext, useContext, useState } from "react";
import { http } from "../services/http";
import { useQuery, useQueryClient } from "@tanstack/react-query";

const AuthContext = createContext({});

export const TOKEN_NAME = "@headset-manager/token";

export function AuthProvider({ children }) {
  const queryClient = useQueryClient();

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
    queryClient.clear();
  }

  function login(token) {
    localStorage.setItem("@headset-manager/token", token);
    http.defaults.headers.common.Authorization = `Bearer ${token}`;
    setSigned(true);
  }

  const { data: user, isPending: isLoadingUser } = useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const response = await http.get("/user/me");
      return response.data;
    },
    enabled: signed,
  });

  return (
    <AuthContext.Provider
      value={{
        signed,
        setSigned,
        logout,
        login,
        user,
        isLoadingUser,
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
