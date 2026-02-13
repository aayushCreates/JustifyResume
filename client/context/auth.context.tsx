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
import { api } from "@/lib/api/api";

interface AuthContextType {
  user: User | null;
  oAuth: () => void;
  logout: () => void;
  isAuthenticated: boolean;
  loading: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);

    const urlParams = new URLSearchParams(window.location.search);
    const tokenFromUrl = urlParams.get("token");
    const tokenFromStorage = localStorage.getItem("token");

    let currentToken: string | null = null;

    if (tokenFromUrl) {
      currentToken = tokenFromUrl;
      localStorage.setItem("token", currentToken);
      router.replace(window.location.pathname); // Clean URL
    } else if (tokenFromStorage) {
      currentToken = tokenFromStorage;
    }
    setToken(currentToken);

    const verifyAuth = async (token: string | null) => {
      try {
        const config = token ? { headers: { Authorization: `Bearer ${token}` } } : {};
        const response = await api.get("/api/v1/auth/me", config);
        
        setUser(response.data.data);

        if (tokenFromUrl) toast.success("Logged in successfully");
      } catch (e) {
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    verifyAuth(currentToken);
  }, [router]);

  const oAuth = async () => {
    window.location.href = `${process.env.NEXT_PUBLIC_API_URL}/api/v1/auth/google`;
  };

  const logout = async () => {
    try {
      await api.post("/api/v1/auth/logout");
    } catch (error) {
      console.error("Backend logout failed, proceeding with client-side cleanup.", error);
    } finally {
      setUser(null);
      setToken(null);
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/");
      toast.success("Logged out successfully");
    }
  };

  const isAuthenticated = !!user;

  return (
    <AuthContext.Provider
      value={{ user, isAuthenticated, oAuth, logout, loading }}
    >
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
