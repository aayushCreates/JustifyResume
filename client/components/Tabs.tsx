interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Tabs({ activeTab, setActiveTab }: Props) {
  const tabs = [
    { id: "skills", label: "Skills" },
    { id: "weak", label: "Weak Claims" },
    { id: "redflags", label: "Red Flags" },
    { id: "questions", label: "Questions" },
  ];

  return (
    <div className="bg-[#16181D] border border-white/5 rounded-xl p-2 flex gap-2 text-sm">
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => setActiveTab(tab.id)}
          className={`px-4 py-2 rounded-lg ${
            activeTab === tab.id
              ? "bg-[#0B1117] text-white"
              : "text-gray-400 hover:text-white"
          }`}
        >
          {tab.label}
        </button>
      ))}
    </div>
  );
}
