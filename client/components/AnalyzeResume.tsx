import { useAuth } from "@/context/auth.context";
import { Upload, ShieldCheck, Github, Globe } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";

export default function AnalyzeResume() {
  const [file, setFile] = useState<File | null>(null);
  const [github, setGithub] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const { user, isAuthenticated } = useAuth();

  const validateAndSetFile = (selectedFile: File) => {
    if (selectedFile.type !== "application/pdf") {
      toast.error("Only PDF files are allowed.");
      return;
    }

    if (selectedFile.size > 10 * 1024 * 1024) {
      toast.error("File must be under 10MB.");
      return;
    }

    setFile(selectedFile);
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (!selectedFile) return;
    validateAndSetFile(selectedFile);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    const droppedFile = e.dataTransfer.files?.[0];
    if (!droppedFile) return;
    validateAndSetFile(droppedFile);
  };

  const handleAnalyze = () => {
    if (!isAuthenticated) {
      toast.error("Please login to analyze the resume.");
      return;
    }

    toast.info("Analysis feature coming soon!");
  };

  return (
    <div className="max-w-3xl mx-auto px-6 py-16 text-white">
      {/* Badge */}
      <div className="flex justify-center mb-6">
        <span className="px-4 py-1 rounded-full border border-emerald-400/30 bg-emerald-400/10 text-emerald-400 text-sm">
          ✨ AI-Powered Analysis
        </span>
        {/* ✦ */}
      </div>

      {/* Title */}
      <h1 className="text-3xl font-semibold text-center mb-3">
        Analyze a Resume
      </h1>

      <p className="text-center text-white/60 mb-8">
        Upload a resume and optionally provide additional sources for deeper
        verification.
      </p>

      {/* Progress Pills */}
      <div className="flex justify-center gap-3 mb-10 text-sm">
        <span className={`px-3 py-1 rounded-full bg-white/5 text-white/60`}>
          {file ? "🟢" : "○"} Resume uploaded
        </span>
        <span className={`px-3 py-1 rounded-full bg-white/5 text-white/60`}>
          {github ? "🟢" : "○"} GitHub connected
        </span>
      </div>

      {/* Upload */}
      <div className="mb-8">
        <label className="text-sm mb-2 block">
          Resume{" "}
          <span className="text-emerald-400 bg-emerald-400/10 px-2 py-0.5 rounded text-xs ml-1">
            Required
          </span>
        </label>

        <div
          onDragOver={(e) => e.preventDefault()}
          onDrop={handleDrop}
          onClick={() => fileInputRef.current?.click()}
          className="border border-dashed border-white/10 rounded-xl p-12 text-center bg-black/20 hover:border-emerald-400/40 transition cursor-pointer"
        >
          <Upload className="mx-auto mb-4 text-white/50" />

          <p className="text-emerald-400">
            Click to upload{" "}
            <span className="text-white/60">or drag and drop</span>
          </p>

          <p className="text-xs text-white/40 mt-1">
            PDF files only (max 10MB)
          </p>

          {file && (
            <p className="mt-4 text-sm text-white/70">Selected: {file.name}</p>
          )}

          <input
            ref={fileInputRef}
            type="file"
            accept="application/pdf"
            className="hidden"
            onChange={handleFileUpload}
          />
        </div>
      </div>

      {/* Github */}
      <div className="mb-6">
        <label className="text-sm mb-2 flex items-center gap-2">
          <Github size={14} /> GitHub Username
          <span className="text-white/40">(Optional)</span>
        </label>

        <input
          onChange={(e) => {
            setGithub(e.target.value);
          }}
          placeholder="e.g., octocat"
          className="w-full bg-black/30 border border-white/10 rounded-lg px-4 py-3 outline-none focus:border-emerald-400"
        />

        <p className="text-xs text-white/40 mt-1">
          We'll analyze their repositories, commits, and coding patterns.
        </p>
      </div>

      {/* Button */}
      <button
        onClick={handleAnalyze}
        disabled={!file}
        className="w-full py-4 rounded-lg bg-emerald-500 text-black font-medium hover:bg-emerald-400 transition mb-8 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        Analyze Resume →
      </button>

      {/* Security Card */}
      <div className="border border-white/10 bg-black/30 rounded-xl p-5 flex gap-4">
        <div className="w-10 h-10 rounded-lg bg-emerald-400/10 flex items-center justify-center">
          <ShieldCheck className="text-emerald-400" />
        </div>

        <div>
          <h3 className="font-medium mb-1">Your data is secure</h3>
          <p className="text-sm text-white/50">
            All uploads are encrypted and processed securely. We never share
            your data with third parties.
          </p>
        </div>
      </div>
    </div>
  );
}
