import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import Navbar from "../../components/Navbar";
import ProfileCard from "../../components/ProfileCard";
import Tabs from "../../components/Tabs";
import SkillCard from "../../components/SkillCard";
import ClaimCard from "../../components/ClaimCard";
import FlagCard from "../../components/FlagCard";
import QuestionCard from "../../components/QuestionCard";
import { Download, Share2 } from "lucide-react";
import ShareReportModal from "../../components/ShareModal";
import { api } from "@/lib/api/api";

// Define types for the report data based on schema
interface SkillScore {
  skill: string;
  score: number;
  verdict: string;
  evidence?: any;
}

interface RedFlag {
  message: string;
  severity: string;
}

interface Report {
  id: string;
  credibility: number;
  resume: {
    parsedJson: {
      name: string;
      email: string;
      phone: string;
      links: {
        github: string;
      }
    }
  };
  skills: SkillScore[];
  redFlags: RedFlag[];
  weakClaims?: any[]; 
  questions?: any[];
}

export default function ReportPage() {
  const [activeTab, setActiveTab] = useState("skills");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false);
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const router = useRouter();
  const { reportId } = router.query;
  const token = typeof window !== 'undefined' ? localStorage.getItem("token") : null;


  useEffect(() => {
    if (reportId && token) {
      const fetchReport = async () => {
        try {
          setLoading(true);
          const response = await api.get(`/api/v1/report/${reportId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          if (response.data.success) {
            setReport(response.data.data);
          } else {
            setError(response.data.message || "Failed to fetch report");
          }
        } catch (err) {
          setError("An error occurred while fetching the report.");
          console.error(err);
        } finally {
          setLoading(false);
        }
      };
      fetchReport();
    }
  }, [reportId, token]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0B1117] text-white flex items-center justify-center">
        <p>Loading report...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#0B1117] text-white flex items-center justify-center">
        <p>Error: {error}</p>
      </div>
    );
  }
  
  if (!report) {
    return (
      <div className="min-h-screen bg-[#0B1117] text-white flex items-center justify-center">
        <p>No report data found.</p>
      </div>
    );
  }
  
  const { resume, credibility, skills, redFlags, weakClaims, questions } = report;

  return (
    <div className="min-h-screen bg-[#0B1117] text-white">
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="mb-10">
          <p className="text-sm text-gray-400">Verification Report</p>
          <h1 className="text-3xl font-bold mt-2">Resume Analysis Complete</h1>

          <div className="flex gap-3 mt-3">
            <button
            onClick={() => setIsShareModalOpen(true)}
            className="flex gap-2 items-center border border-gray-800 px-3 py-1 rounded-md text-sm hover:cursor-pointer hover:bg-white/10">
            <Share2 size={13} />
              Share Report
            </button>
            <button className="flex gap-2 items-center border border-gray-800 px-3 py-1 rounded-md text-sm">
              <Download size={13} />
              Download
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-[380px_1fr] gap-10">
          {/* Sidebar */}
          <div className="lg:col-span-4">
            <ProfileCard 
              name={resume.parsedJson.name}
              email={resume.parsedJson.email}
              phone={resume.parsedJson.phone}
              githubUrl={resume.parsedJson.links?.github}
              credibility={credibility}
            />
          </div>

          {/* Content */}
          <div className="lg:col-span-8">
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="mt-8 space-y-6">
              {activeTab === "skills" && (
                <>
                  {skills.map((skill, index) => (
                    <SkillCard
                      key={index}
                      title={skill.skill}
                      percent={skill.score}
                      tags={skill.evidence?.supportedRepos || []}
                    />
                  ))}
                </>
              )}

              {activeTab === "weak" && (
                <>
                  {weakClaims ? weakClaims.map((claim, index) => (
                    <ClaimCard
                      key={index}
                      title={claim.title}
                      percent={claim.percent}
                      description={claim.description}
                    />
                  )) : <p>No weak claims identified.</p>}
                </>
              )}

              {activeTab === "redflags" && (
                <>
                  {redFlags.map((flag, index) => (
                    <FlagCard
                      key={index}
                      title={flag.message} // Assuming message is the title
                      level={flag.severity}
                      description="Further details about this red flag." // The model doesn't provide this
                    />
                  ))}
                </>
              )}

              {activeTab === "questions" && (
                <>
                  {questions ? questions.map((q, index) => (
                    <QuestionCard
                      key={index}
                      category={q.category}
                      question={q.question}
                      reason={q.reason}
                    />
                  )) : <p>No interview questions generated.</p>}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <ShareReportModal isOpen={isShareModalOpen} onClose={() => setIsShareModalOpen(false)} />
    </div>
  );
}
