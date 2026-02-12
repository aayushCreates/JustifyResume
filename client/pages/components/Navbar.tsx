import Link from "next/link";
import { useState } from "react";
import AuthModal from "./AuthModal";
import { usePathname } from "next/navigation";

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
  const [open, setOpen] = useState<boolean>(false);
  const pathname = usePathname();

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

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => setOpen(true)}
              className="hidden sm:block text-sm text-white/70 hover:text-white transition"
            >
              Sign in
            </button>

            <button className="px-4 py-2 rounded-lg bg-emerald-400 text-black text-sm font-medium hover:bg-emerald-300 transition shadow-[0_0_20px_rgba(16,185,129,0.25)]">
              Get Started
            </button>
          </div>
        </div>
      </nav>

      {/* Auth Modal */}
      <AuthModal isOpen={open} onClose={() => setOpen(false)} />
    </>
  );
}
