import { useState } from "react";
import Navbar from "../../components/Navbar";
import ProfileCard from "../../components/ProfileCard";
import Tabs from "../../components/Tabs";
import SkillCard from "../../components/SkillCard";
import ClaimCard from "../../components/ClaimCard";
import FlagCard from "../../components/FlagCard";
import QuestionCard from "../../components/QuestionCard";
import { Download, Share2 } from "lucide-react";
import ShareReportModal from "../../components/ShareModal";

export default function SampleReport() {
  const [activeTab, setActiveTab] = useState("skills");
  const [isShareModalOpen, setIsShareModalOpen] = useState(false); 

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
            <ProfileCard />
          </div>

          {/* Content */}
          <div className="lg:col-span-8">
            <Tabs activeTab={activeTab} setActiveTab={setActiveTab} />

            <div className="mt-8 space-y-6">
              {activeTab === "skills" && (
                <>
                  <SkillCard
                    title="React.js"
                    percent={94}
                    tags={["react-dashboard", "ecommerce-app"]}
                  />
                  <SkillCard
                    title="TypeScript"
                    percent={88}
                    tags={["15 repositories", "Work experience"]}
                  />
                  <SkillCard
                    title="Node.js"
                    percent={82}
                    tags={["api-server", "Portfolio"]}
                  />
                </>
              )}

              {activeTab === "weak" && (
                <>
                  <ClaimCard
                    title="Machine Learning"
                    percent={23}
                    description="No ML repositories found. No commits involving ML libraries. Claim appears on resume only."
                  />
                  <ClaimCard
                    title="System Design"
                    percent={45}
                    description="Limited evidence in public work. No architecture documentation or design patterns visible."
                  />
                </>
              )}

              {activeTab === "redflags" && (
                <>
                  <FlagCard
                    title="Generic Todo App as Main Project"
                    level="Low"
                    description="Primary portfolio project is a basic todo application with minimal custom functionality."
                  />
                  <FlagCard
                    title="Generic Todo App as Main Project"
                    level="Medium"
                    description="Primary portfolio project is a basic todo application with minimal custom functionality."
                  />
                  <FlagCard
                    title="Timeline Inconsistency"
                    level="High"
                    description="Resume claims 6 years experience, but GitHub activity only starts 3 years ago."
                  />
                </>
              )}

              {activeTab === "questions" && (
                <>
                  <QuestionCard
                    category="Machine Learning"
                    question="Can you walk me through a machine learning model you've built and deployed?"
                    reason="Low confidence (23%) — no evidence found for this claimed skill."
                  />
                  <QuestionCard
                    category="System Design"
                    question="Describe a system you designed from scratch. What were key architectural decisions?"
                    reason="Medium confidence (45%) — limited public evidence."
                  />
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