import { OctagonAlert } from "lucide-react";

interface Props {
  title: string;
  level: "Low" | "Medium" | "High";
  description: string;
}

export default function FlagCard({ title, level, description }: Props) {
  let border = "";
  let bg = "";
  let box_bg = "";
  let text = "";

  if (level === "Low") {
    border = "border-green-500/30";
    bg = "bg-green-500/10";
    box_bg = "bg-green-900/10";
    text = "text-green-400";
  } else if (level === "Medium") {
    border = "border-yellow-500/30";
    bg = "bg-yellow-500/10";
    box_bg = "bg-yellow-900/10";
    text = "text-yellow-400";
  } else {
    border = "border-red-500/30";
    bg = "bg-red-500/10";
    box_bg = "bg-red-900/10";
    text = "text-red-400";
  }

  return (
    <div className={`${box_bg} border ${border} rounded-xl p-5`}>
      <div className="flex gap-3">
        
        {/* Icon */}
        <div className={`flex items-center justify-center w-10 h-10 rounded-lg ${bg}`}>
          <OctagonAlert className={text} size={18} />
        </div>

        {/* Content */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-1">
            <h3 className="font-semibold text-white">{title}</h3>

            <span className={`text-xs px-3 py-1.5 rounded-full ${bg} ${text}`}>
              {level}
            </span>
          </div>

          <p className="text-sm text-gray-400">
            {description}
          </p>
        </div>
      </div>
    </div>
  );
}
