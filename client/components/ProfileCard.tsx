import {
  Briefcase,
  Calendar,
  CodeXml,
  GitCommitHorizontal,
  Github,
  MapPin,
} from "lucide-react";

export default function ProfileCard() {
  return (
    <div className="space-y-6">
      {/* Profile */}
      <div className="bg-[#16181D] border border-white/5 rounded-2xl p-6">
        <div className="flex items-center gap-4">
          <div className="h-14 w-14 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-lg">
            AC
          </div>

          <div>
            <h3 className="font-semibold text-lg">Alex Chen</h3>
            <p className="text-sm text-gray-400">Senior Full Stack Developer</p>
          </div>
        </div>

        <div className="mt-6 space-y-3 text-sm text-gray-400">
          <p className="flex items-center gap-2">
            <div className="bg-gray-800 px-1.5 py-1.5 rounded-lg">
              <Briefcase size={18} />
            </div>
            6 years experience
          </p>
          <p className="flex items-center gap-2">
            <div className="bg-gray-800 px-1.5 py-1.5 rounded-lg">
              <MapPin size={18} />
            </div>
            San Francisco, CA
          </p>
        </div>
      </div>

      {/* Fraud Risk */}
      <div className="bg-[#16181D] border border-white/5 rounded-2xl p-6">
        <p className="text-xs text-gray-400 mb-2 tracking-wide">
          OVERALL ASSESSMENT
        </p>

        <div className="flex justify-between items-start">
          <h4 className="font-semibold text-lg">Fraud Risk</h4>

          <div className="inline-flex items-center gap-2 bg-yellow-500/10 text-yellow-400 px-4 py-2 rounded-full text-sm border border-yellow-500/40">
            ● Medium Risk
          </div>
        </div>

        <p className="text-sm text-gray-400 leading-relaxed mt-5">
          This candidate has some verified skills but multiple claims require
          follow-up during interview.
        </p>
      </div>

      {/* GitHub Card */}
      <div className="bg-[#16181D] border border-white/5 rounded-2xl overflow-hidden">
        <div className="p-6 border-b border-white/10">
          <div className="flex items-center gap-2">
            <div className="bg-gray-800 px-1.5 py-1.5 rounded-lg">
              <Github />
            </div>
            <div>
              <h4 className="font-semibold">alexchen-dev</h4>
              <p className="text-sm text-gray-400">GitHub Profile</p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 text-center divide-x divide-white/10">
          <div className="flex flex-col items-center py-6">
            <CodeXml size={16} className="text-gray-400" />
            <div className="mt-1">
              <p className="text-2xl font-semibold">23</p>
              <p className="text-xs text-gray-400 mt-1">Repositories</p>
            </div>
          </div>

          <div className="flex flex-col items-center py-6">
            <GitCommitHorizontal size={16} className="text-gray-400" />
            <div className="mt-1">
              <p className="text-2xl font-semibold">847</p>
              <p className="text-xs text-gray-400 mt-1">Commits</p>
            </div>
          </div>

          <div className="flex flex-col items-center py-6">
            <Calendar size={16} className="text-gray-400" />

            <div className="mt-1">
              <p className="text-2xl font-semibold">3</p>
              <p className="text-xs text-gray-400 mt-1">Active Years</p>
            </div>
          </div>
        </div>

        <div className="p-6 border-t border-white/10">
          <p className="text-xs text-gray-400 mb-3">TOP LANGUAGES</p>

          <div className="flex flex-wrap gap-2">
            <span className="text-xs bg-white/10 px-3 py-1 rounded-full">
              TypeScript
            </span>
            <span className="text-xs bg-white/10 px-3 py-1 rounded-full">
              JavaScript
            </span>
            <span className="text-xs bg-white/10 px-3 py-1 rounded-full">
              Python
            </span>
            <span className="text-xs bg-white/10 px-3 py-1 rounded-full">
              Go
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
