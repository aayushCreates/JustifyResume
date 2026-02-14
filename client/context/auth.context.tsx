import {
  ReactNode,
  createContext,
  useContext,
  useState,
  useEffect,
  useRef, // Added useRef
} from "react";
import { toast } from "sonner";
import { api } from "@/lib/api/api";
import { User } from "@/types/user.types";
import { useRouter } from "next/router";

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
  const effectRan = useRef(false); // Declare useRef here

  useEffect(() => {
    if (effectRan.current) { // Prevent re-running in Strict Mode
      return;
    }
    effectRan.current = true;

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

    const verifyAuth = async (tokenToVerify: string) => {
      try {
        const config = { headers: { Authorization: `Bearer ${tokenToVerify}` } };
        const response = await api.get("/api/v1/auth/me", config);
        
        setUser(response.data.data);

        if (tokenFromUrl) toast.success("Logged in successfully");
      } catch (e) {
        console.error("Authentication verification failed:", e);
        setUser(null);
        setToken(null);
        localStorage.removeItem("token");
      } finally {
        setLoading(false);
      }
    };

    if (currentToken) { // Only call backend if a token exists
      verifyAuth(currentToken);
    } else {
      setUser(null);
      setLoading(false); // Stop loading without backend call
    }
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
