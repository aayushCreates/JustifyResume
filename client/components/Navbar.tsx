import Link from "next/link";
import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useAuth } from "@/context/auth.context";

const options = [
  {
    name: "Home",
    redirect: "/",
  },
  {
    name: "Analyze",
    redirect: "/resume",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const { user, oAuth, logout } = useAuth();
  const [isDropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  function handleGoogleLogin() {
    oAuth();
  }

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  return (
    <>
      <nav className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/40 backdrop-blur-xl">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center gap-3 cursor-pointer">
            <div className="w-9 h-9 rounded-xl bg-emerald-500/10 border border-emerald-400/20 flex items-center justify-center text-emerald-400 font-semibold">
              JR
            </div>
            <span className="font-semibold text-lg tracking-tight">
              JustifyResume
            </span>
          </div>

          {/* Nav Links */}
          <div className="hidden md:flex items-center gap-8 text-sm">
            {options.map((tab, i) => (
              <Link
                key={tab.name}
                href={tab.redirect}
                className="text-white font-medium relative"
              >
                {tab.name}
                {pathname === tab.redirect && (
                  <span className="absolute -bottom-2 left-0 w-full h-[2px] bg-emerald-400 rounded"></span>
                )}
              </Link>
            ))}
          </div>
          {user ? (
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setDropdownOpen((prev) => !prev)}
                className="flex items-center gap-3"
              >
                {user.avatarUrl ? (
                  <img
                    src={user.avatarUrl}
                    alt={user.name || "User Avatar"}
                    className="w-8 h-8 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center text-white text-sm font-medium">
                    {user.name ? user.name[0].toUpperCase() : "U"}
                  </div>
                )}
                <span className="hidden sm:block text-sm font-medium text-white/90">
                  {user.name || user.email}
                </span>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-black/50 border border-white/10 rounded-lg shadow-lg backdrop-blur-xl z-50">
                  <ul className="py-1">
                    <li>
                      <button
                        onClick={() => {
                          logout();
                          setDropdownOpen(false);
                        }}
                        className="w-full text-left px-4 py-2 text-sm text-red-400 hover:bg-white/5"
                      >
                        Logout
                      </button>
                    </li>
                  </ul>
                </div>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-3">
              <button
                onClick={handleGoogleLogin}
                className="px-4 py-2 rounded-lg bg-black/10 border border-green-600/50 text-green-400 text-sm font-medium hover:bg-emerald-600/10 transition shadow-[0_0_20px_rgba(16,185,129,0.25)] flex gap-2 items-center"
              >
                Login with
                <div className="bg-white px-1 py-1 rounded-full">
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
                </div>
              </button>
            </div>
          )}
        </div>
      </nav>
    </>
  );
}
