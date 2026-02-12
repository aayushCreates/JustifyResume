import { useAuth } from "@/context/auth.context";
import { useEffect } from "react";

type Props = {
  isOpen: boolean;
  onClose: () => void;
};

export default function AuthModal({ isOpen, onClose }: Props) {
  const { oAuth } = useAuth();

  if (!isOpen) return null;

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [onClose]);

  function handleGoogleLogin() {
    oAuth();
    console.log("Google login clicked");
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">

      {/* overlay */}
      <div
        onClick={onClose}
        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
      />

      {/* modal */}
      <div className="relative w-full max-w-md mx-4 rounded-2xl border border-white/10 bg-[#0b0f14] p-8 shadow-2xl">

        {/* close */}
        <button
          onClick={onClose}
          className="absolute right-4 top-4 text-white/40 hover:text-white transition"
        >
          ✕
        </button>

        {/* icon */}
        <div className="mb-6 flex justify-center">
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 text-xl">
            JR
          </div>
        </div>

        {/* title */}
        <h2 className="text-center text-xl font-semibold mb-2">
          Continue with Google
        </h2>

        <p className="text-center text-sm text-white/60 mb-8">
          Secure sign in to access resume verification tools.
        </p>

        {/* google button */}
        <button
          onClick={handleGoogleLogin}
          className="w-full flex items-center justify-center gap-3 rounded-lg border border-white/10 bg-white text-black font-medium py-3 hover:bg-gray-200 transition"
        >
          {/* google svg */}
          <svg width="18" height="18" viewBox="0 0 48 48">
            <path
              fill="#EA4335"
              d="M24 9.5c3.6 0 6.8 1.2 9.3 3.5l6.9-6.9C35.8 2.1 30.3 0 24 0 14.6 0 6.4 5.4 2.5 13.3l8 6.2C12.6 13 17.9 9.5 24 9.5z"
            />
            <path
              fill="#4285F4"
              d="M46.5 24.5c0-1.6-.1-2.8-.4-4H24v7.6h12.7c-.3 1.9-1.9 4.7-5.4 6.6l8.3 6.5c4.8-4.4 7.6-10.9 7.6-16.7z"
            />
            <path
              fill="#FBBC05"
              d="M10.5 28.5c-.5-1.5-.8-3.1-.8-4.5s.3-3 .8-4.5l-8-6.2C.9 16.4 0 20.1 0 24s.9 7.6 2.5 10.7l8-6.2z"
            />
            <path
              fill="#34A853"
              d="M24 48c6.3 0 11.6-2.1 15.5-5.7l-8.3-6.5c-2.3 1.6-5.3 2.7-7.2 2.7-6.1 0-11.4-3.5-13.5-8.5l-8 6.2C6.4 42.6 14.6 48 24 48z"
            />
          </svg>

          Continue with Google
        </button>

        {/* footer */}
        <p className="text-xs text-center text-white/40 mt-6">
          We only support secure Google authentication.
        </p>
      </div>
    </div>
  );
}
