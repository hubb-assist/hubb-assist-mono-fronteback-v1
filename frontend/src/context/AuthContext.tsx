// src/context/AuthContext.tsx
import { createContext, useContext, useState, useEffect, ReactNode } from "react";
import { jwtDecode } from "jwt-decode";

// Tipos de roles possíveis
export type Role =
  | "ADMIN"
  | "DONO_DE_CLINICA"
  | "COLAB_N1"
  | "COLAB_N2"
  | "COLAB_N3"
  | "PACIENTE";

interface User {
  id: string;
  roles: Role[];
}

interface AuthContextType {
  user: User | null;
  hasAnyRole: (...roles: Role[]) => boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      try {
        const payload = jwtDecode<{ sub: string; roles: Role[] }>(token);
        setUser({ id: payload.sub, roles: payload.roles });
      } catch (error) {
        console.error("Invalid token:", error);
        localStorage.removeItem("access_token");
      }
    }
  }, []);

  const hasAnyRole = (...roles: Role[]) => {
    if (!user) return false;
    return roles.some((r) => user.roles.includes(r));
  };

  const login = (token: string) => {
    localStorage.setItem("access_token", token);
    try {
      const payload = jwtDecode<{ sub: string; roles: Role[] }>(token);
      setUser({ id: payload.sub, roles: payload.roles });
    } catch (error) {
      console.error("Invalid token during login:", error);
      localStorage.removeItem("access_token");
    }
  };

  const logout = () => {
    localStorage.removeItem("access_token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, hasAnyRole, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}