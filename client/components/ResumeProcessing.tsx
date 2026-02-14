import {
  ShieldCheck,
  Check,
  Loader2,
  Sparkles,
  FileText,
} from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { api } from "@/lib/api/api";

export default function ResumeProcessing({
  resumeFile,
}: {
  resumeFile: File | null;
}) {
  const [progress, setProgress] = useState<number>(0);
  const [processingCompleted, setProcessingCompleted] = useState<boolean>(
    false
  );
  const [resumeId, setResumeId] = useState<string | null>(null);
  const [reportId, setReportId] = useState<string | null>(null);
  const router = useRouter();
  const token = localStorage.getItem("token");
  const processingStarted = useRef(false);

  const [steps, setSteps] = useState([
    {
      title: "Uploading and Parsing Resume",
      desc: "Extracting text and structure from the document",
      status: "pending",
    },
    {
      title: "Starting Analysis",
      desc: "Initializing the analysis process",
      status: "pending",
    },
    {
      title: "Analyzing GitHub Activity",
      desc: "Reviewing commit history and code contributions",
      status: "pending",
    },
    {
      title: "Verifying Claims",
      desc: "Cross-referencing claims with evidence sources",
      status: "pending",
    },
    {
      title: "Generating Report",
      desc: "Compiling findings and recommendations",
      status: "pending",
    },
  ]);

  useEffect(() => {
    if (resumeFile && !processingStarted.current) {
      processingStarted.current = true;
      handleProcessing();
    }
  }, [resumeFile]);

  const handleUploadAndParse = async () => {
    try {
      const formData = new FormData();
      formData.append("file", resumeFile as File);
      // formData.append("github", github);

      const response = await api.post(
        `/api/v1/resume/upload`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`
          },
        }
      );

      return response.data;
    } catch (err) {
      console.error("Upload and parse failed", err);
    }
  };

  const startAnalysis = async (resumeId: string) => {
    try {
      const response = await api.get(`api/v1/analysis/resume/${resumeId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
      });
      return response.data;
    } catch (err) {
      console.error("Analysis trigger failed", err);
    }
  }

  const pollReport = async (reportId: string) => {
    try {
      const report = await api.get(`/api/v1/report/${reportId}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
      });

      if (report.data?.data?.status === "COMPLETED") {
        setProcessingCompleted(true);
        setSteps((prevSteps) =>
          prevSteps.map((step) => ({ ...step, status: "done" }))
        );
        setProgress(100);
      } else {
        setTimeout(() => pollReport(reportId), 3000);
      }
    } catch (err) {
      console.error("Polling failed", err);
    }
  };

  const handleProcessing = async () => {
    // Step 1: Upload and Parse
    setSteps((prevSteps) =>
      prevSteps.map((step, index) =>
        index === 0 ? { ...step, status: "active" } : step
      )
    );
    setProgress(10);
    const uploadResponse = await handleUploadAndParse();

    if (uploadResponse && uploadResponse.success) {
      setSteps((prevSteps) =>
        prevSteps.map((step, index) =>
          index === 0 ? { ...step, status: "done" } : step
        )
      );
      setProgress(25);

      const resumeId = uploadResponse.data.resumeId;
      setResumeId(resumeId);

      // Step 2: Trigger Analysis
      setSteps((prevSteps) =>
        prevSteps.map((step, index) =>
          index === 1 ? { ...step, status: "active" } : step
        )
      );
      const analysisResponse = await startAnalysis(resumeId);

      if(analysisResponse && analysisResponse.success) {
        setSteps((prevSteps) =>
          prevSteps.map((step, index) =>
            index === 1 ? { ...step, status: "done" } : step
          )
        );
        setProgress(50);
        
        const reportId = analysisResponse.data.reportId;
        setReportId(reportId);

        // Step 3: Poll for report
        setSteps((prevSteps) =>
          prevSteps.map((step, index) =>
            index > 1 ? { ...step, status: "active" } : step
          )
        );
        setProgress(75);
        pollReport(reportId);
      }
    }
  };

  return (
    <div className="min-h-screen text-white px-24 py-8">
      <div className="max-w-2xl mx-auto text-center">
        {/* Icon */}
        <div className="w-20 h-20 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-6">
          <ShieldCheck className="text-emerald-400 w-8 h-8" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-semibold mb-3">Analyzing Resume</h1>

        <p className="text-white/60 mb-8">
          Our AI is verifying claims and gathering evidence. This typically
          takes under a minute.
        </p>

        {/* Progress */}
        <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden mb-3">
          <div
            style={{ width: `${progress}%` }}
            className="h-full bg-emerald-500 transition-all duration-500"
          />
        </div>

        <p className="text-white/50 mb-10">{progress}% complete</p>

        {/* Steps Card */}
        <div className="border border-white/10 bg-white/[0.02] rounded-2xl p-8 text-left">
          {steps.map((step, index) => (
            <div key={index} className="flex gap-4 relative pb-8 last:pb-0">
              {/* Timeline Line */}
              {index !== steps.length - 1 && (
                <div className="absolute left-5 top-10 w-px h-full bg-white/10" />
              )}

              {/* Icon */}
              <div
                className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0
                ${
                  step.status === "done"
                    ? "bg-emerald-500 text-black"
                    : step.status === "active"
                    ? "bg-emerald-500/20 text-emerald-400 border border-emerald-400/40"
                    : "bg-white/5 text-white/40 border border-white/10"
                }`}
              >
                {step.status === "done" && <Check size={16} />}
                {step.status === "active" && (
                  <Loader2 size={16} className="animate-spin" />
                )}
                {step.status === "pending" && index + 1}
              </div>

              {/* Text */}
              <div>
                <h3 className="font-medium flex items-center gap-2">
                  {step.title}
                  {step.status === "done" && (
                    <span className="text-emerald-400 text-sm">✓ Done</span>
                  )}
                </h3>

                <p className="text-sm text-white/50">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Footer Note */}
        {processingCompleted ? (
          <button
            onClick={() => {
              router.push(`/dashboard?reportId=${reportId}`);
            }}
            className="flex gap-4 justify-center items-center w-full py-4 rounded-lg bg-emerald-500 text-black font-semibold hover:bg-emerald-400 transition mb-8 mt-8"
          >
            <FileText size={17} />
            Get Verification Report
          </button>
        ) : (
          <p className="mt-8 text-sm text-white/50 flex items-center justify-center gap-2">
            <Sparkles size={14} />
            Please don't close this page while analysis is in progress.
          </p>
        )}
      </div>
    </div>
  );
}
