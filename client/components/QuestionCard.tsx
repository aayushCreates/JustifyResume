import { MessageSquare } from "lucide-react";

interface Props {
  category: string;
  question: string;
  reason: string;
}

export default function QuestionCard({ category, question, reason }: Props) {
  return (
    <div className="bg-[#16181D] border border-emerald-500/20 rounded-2xl p-6 flex gap-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
      
      {/* Icon */}
      <div className="flex items-start">
        <div className="w-10 h-10 flex items-center justify-center rounded-xl bg-emerald-500/10">
          <MessageSquare size={18} className="text-emerald-400" />
        </div>
      </div>

      {/* Content */}
      <div className="flex-1 space-y-3">
        
        {/* Category */}
        <span className="inline-block text-xs bg-emerald-500/10 text-emerald-400 px-3 py-1 rounded-full font-medium">
          {category}
        </span>

        {/* Question */}
        <h3 className="text-white font-semibold text-base leading-snug">
          {question}
        </h3>

        {/* Reason Box */}
        <div className="text-sm bg-[#0B1117] border border-white/5 rounded-xl p-4 text-gray-400 leading-relaxed">
          <span className="text-emerald-400 font-medium">Why ask:</span>{" "}
          {reason}
        </div>
      </div>
    </div>
  );
}
