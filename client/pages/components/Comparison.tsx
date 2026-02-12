type ComparisonItem = {
    title: string;
    traditional: string;
    modern: string;
  };
  
  const comparisonData: ComparisonItem[] = [
    {
      title: "Skill Verification",
      traditional: "Self-reported, unverified",
      modern: "Cross-referenced with GitHub & projects",
    },
    {
      title: "Time to Screen",
      traditional: "30-45 minutes per resume",
      modern: "Under 2 minutes per resume",
    },
    {
      title: "Fraud Detection",
      traditional: "Manual, inconsistent",
      modern: "AI-powered, 94% accuracy",
    },
    {
      title: "Interview Questions",
      traditional: "Generic, template-based",
      modern: "Tailored to candidate's claims",
    },
    {
      title: "GitHub Analysis",
      traditional: "Manual code review",
      modern: "Automated commit & contribution analysis",
    },
  ];
  
  export default function Comparison() {
    return (
      <section className="relative px-6 py-28">
  
        <div className="max-w-5xl mx-auto text-center">
  
          {/* Badge */}
          <div className="inline-flex px-4 py-1.5 rounded-full text-xs border border-red-400/30 text-red-300 bg-red-400/10 mb-6">
            ⚡ WHY SWITCH
          </div>
  
          {/* Heading */}
          <h2 className="text-3xl md:text-4xl font-semibold">
            Traditional hiring vs. JustifyResume
          </h2>
  
          <p className="mt-4 text-white/60">
            Stop relying on outdated screening methods. Here's how we compare.
          </p>
  
          {/* Header labels */}
          <div className="flex justify-end gap-4 mt-10 mb-6 text-sm">
            <div className="px-4 py-2 rounded-full bg-white/5 border border-white/10 text-white/70">
              Traditional Hiring
            </div>
            <div className="px-4 py-2 rounded-full bg-emerald-400 text-black font-medium">
              JustifyResume
            </div>
          </div>
  
          {/* Rows */}
          <div className="flex flex-col gap-4">
  
            {comparisonData.map((item, index) => (
              <div
                key={index}
                className="grid md:grid-cols-3 gap-4 p-5 rounded-xl border border-white/10 bg-white/[0.02] text-left items-center"
              >
  
                {/* Feature */}
                <div className="font-medium">
                  {item.title}
                </div>
  
                {/* Traditional */}
                <div className="text-sm text-red-300 flex items-center gap-2">
                  <span>✖</span>
                  {item.traditional}
                </div>
  
                {/* Modern */}
                <div className="text-sm text-emerald-400 flex items-center gap-2">
                  <span>✔</span>
                  {item.modern}
                </div>
  
              </div>
            ))}
  
          </div>
  
        </div>
      </section>
    );
  }
  