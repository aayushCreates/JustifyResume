import { Github } from "lucide-react";

interface Props {
  title: string;
  percent: number;
  tags: string[];
}

export default function SkillCard({ title, percent, tags }: Props) {
  return (
    <div className="bg-[#16181D] border border-emerald-500/20 rounded-2xl p-6">
      {/* Top Row */}
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-white">{title}</h3>
        <div className="flex items-center gap-3">
          {/* Progress Bar */}
          <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-emerald-500 transition-all rounded-full duration-500"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="text-emerald-400 font-medium">{percent}%</p>
        </div>
      </div>

      {/* Tags */}
      <div className="flex gap-2 mt-5 flex-wrap">
        {tags.map((tag) => (
          <span
            key={tag}
            className="flex items-center gap-2 text-xs bg-white/5 px-3 py-1 rounded-full text-gray-400"
          >
            <Github size={13} />
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
}
