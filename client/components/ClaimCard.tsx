interface Props {
  title: string;
  percent: number;
  description: string;
}

export default function ClaimCard({ title, percent, description }: Props) {
  return (
    <div className="bg-[#16181D] border border-red-500/30 rounded-2xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold text-white">{title}</h3>
        <div className="flex items-center gap-3">
          {/* Progress Bar */}
          <div className="w-20 h-2 bg-white/10 rounded-full overflow-hidden">
            <div
              className="h-full bg-red-500"
              style={{ width: `${percent}%` }}
            />
          </div>
          <p className="text-red-400 font-medium">{percent}%</p>
        </div>
      </div>

      <p className="text-sm text-gray-400 mt-4">{description}</p>
    </div>
  );
}
