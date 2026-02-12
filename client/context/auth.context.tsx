import { User } from "@/types/user.types";
import { useRouter } from "next/navigation";
import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";
import { toast } from "sonner";

interface AuthContextType {
  user: User | null;
  oAuth: () => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [token, setToken] = useState<string | null>(null);
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    const storedUser = localStorage.getItem("user");

    if (storedToken && storedUser) {
      setToken(storedToken);
      setUser(JSON.parse(storedUser));
    }
  }, []);

  const oAuth = () => {
    console.log(
      "process.env.NEXT_PUBLIC_BASE_API_URL: ",
      process.env.NEXT_PUBLIC_BASE_API_URL
    );
    window.location.href = `${process.env.NEXT_PUBLIC_BASE_API_URL}/api/v1/auth/google`;
  };

  const logout = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.replace("/");
    toast.success("Logged out successfully");
  };

  const isAuthenticated = !!token;

  return (
    <AuthContext.Provider value={{ user, isAuthenticated, oAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};
