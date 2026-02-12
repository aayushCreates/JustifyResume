import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full border-b border-white/10 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">

        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-9 h-9 rounded-lg bg-white/10 flex items-center justify-center">
            <span className="font-semibold">JR</span>
          </div>
          <span className="font-semibold text-lg">JustifyResume</span>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex items-center gap-8 text-sm text-white/70">
          <Link href="/" className="text-white border-b-2 border-emerald-400 pb-1">
            Home
          </Link>
          <Link href="#">Analyze</Link>
          <Link href="#">Sample Report</Link>
        </div>

        {/* Actions */}
        <div className="flex items-center gap-4">
          <button className="text-white/70 text-sm">Sign in</button>

          <button className="px-4 py-2 rounded-md bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition">
            Get Started
          </button>
        </div>

      </div>
    </nav>
  );
}
