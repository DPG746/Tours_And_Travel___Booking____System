import { createContext, useContext, useState, useEffect, useCallback, ReactNode } from "react";
import { API_BASE_URL } from "@/lib/config";

interface User {
  id: number;
  username: string;
  fullName: string;
  email: string;
  role: "ADMIN" | "USER";
}

interface AuthContextType {
  user: User | null;
  token: string | null;
  login: (username: string, password: string) => Promise<{ success: boolean; message?: string }>;
  register: (data: RegisterData) => Promise<{ success: boolean; message?: string }>;
  logout: () => void;
  isAdmin: boolean;
  isAuthenticated: boolean;
}

interface RegisterData {
  username: string;
  email: string;
  password: string;
  fullName: string;
  phone: string;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("travelwise_token");
    const storedUser = localStorage.getItem("travelwise_user");
    if (storedToken && storedUser) {
      try {
        setToken(storedToken);
        setUser(JSON.parse(storedUser));
      } catch {
        localStorage.removeItem("travelwise_token");
        localStorage.removeItem("travelwise_user");
      }
    }
  }, []);

  const login = useCallback(async (username: string, password: string) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!res.ok) {
        const data = await res.json();
        return { success: false, message: data.error || "Login failed" };
      }

      const data = await res.json();
      const u: User = {
        id: data.userId,
        username: data.username,
        fullName: data.fullName,
        email: data.email,
        role: data.role,
      };

      setToken(data.token);
      setUser(u);
      localStorage.setItem("travelwise_token", data.token);
      localStorage.setItem("travelwise_user", JSON.stringify(u));
      return { success: true };
    } catch {
      return { success: false, message: "Network error. Please try again." };
    }
  }, []);

  const register = useCallback(async (regData: RegisterData) => {
    try {
      const res = await fetch(`${API_BASE_URL}/api/auth/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(regData),
      });

      if (!res.ok) {
        const data = await res.json();
        return { success: false, message: data.error || "Registration failed" };
      }

      const data = await res.json();
      const u: User = {
        id: data.userId,
        username: data.username,
        fullName: data.fullName,
        email: data.email,
        role: data.role,
      };

      setToken(data.token);
      setUser(u);
      localStorage.setItem("travelwise_token", data.token);
      localStorage.setItem("travelwise_user", JSON.stringify(u));
      return { success: true };
    } catch {
      return { success: false, message: "Network error. Please try again." };
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("travelwise_token");
    localStorage.removeItem("travelwise_user");
  }, []);

  const isAdmin = user?.role === "ADMIN";
  const isAuthenticated = !!user && !!token;

  return (
    <AuthContext.Provider value={{ user, token, login, register, logout, isAdmin, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
};
