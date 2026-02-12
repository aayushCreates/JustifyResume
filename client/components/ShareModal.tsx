import { useEffect } from "react";
import { X, Link2, Mail, Linkedin, Twitter, Copy } from "lucide-react";

interface ShareReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function ShareReportModal({
  isOpen,
  onClose,
}: ShareReportModalProps) {
  const verificationLink = "https://justify-resume.lovable.app/verify/sample";

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(verificationLink);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm">
      {/* Modal */}
      <div className="relative w-full max-w-lg rounded-2xl bg-[#0B1117] p-6 text-white shadow-2xl border border-white/5">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-gray-400 hover:text-white transition"
        >
          <X size={20} />
        </button>

        {/* Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 rounded-md bg-emerald-500/10">
            <Link2 className="text-emerald-400" size={18} />
          </div>
          <h2 className="text-lg font-semibold">Share Report</h2>
        </div>

        <p className="text-sm text-gray-400 mb-6">
          Share this verification report with team members or stakeholders.
        </p>

        {/* Public Link */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-2">Public verification link</p>

          <div className="flex items-center gap-2">
            <div className="flex-1 rounded-lg border border-white/10 bg-[#16181D] px-4 py-2 text-sm text-gray-300 overflow-hidden truncate">
              {verificationLink}
            </div>

            <button
              onClick={handleCopy}
              className="rounded-lg border border-white/10 bg-[#16181D] p-2 hover:bg-white/5 transition"
            >
              <Copy size={16} />
            </button>
          </div>
        </div>

        {/* Share Via */}
        <div className="mb-6">
          <p className="text-sm font-medium mb-3">Share via</p>

          <div className="grid grid-cols-3 gap-3">
            <button className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#16181D] py-2 text-sm hover:bg-white/5 transition">
              <Mail size={16} />
              Email
            </button>

            <button className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#16181D] py-2 text-sm hover:bg-white/5 transition">
              <Linkedin size={16} />
              LinkedIn
            </button>

            <button className="flex items-center justify-center gap-2 rounded-lg border border-white/10 bg-[#16181D] py-2 text-sm hover:bg-white/5 transition">
              <Twitter size={16} />
              Twitter
            </button>
          </div>
        </div>

        {/* Note */}
        <div className="rounded-xl bg-[#16181D] border border-white/5 p-4 text-sm text-gray-400">
          <span className="font-semibold text-gray-300">Note:</span> Anyone with
          this link can view the verification report. The report shows verified
          skills and confidence scores only.
        </div>
      </div>
    </div>
  );
}
