type Feature = {
    title: string;
    description: string;
    icon: string;
  };
  
  const features: Feature[] = [
    {
      title: "Resume Claim Verification",
      description:
        "Cross-reference every skill and experience claim against real evidence. No more taking resumes at face value.",
      icon: "🛡",
    },
    {
      title: "GitHub Intelligence",
      description:
        "Deep analysis of commit history, code quality, and project contributions to validate technical claims.",
      icon: "🐙",
    },
    {
      title: "Fraud Risk Scoring",
      description:
        "AI-powered detection of inflated claims, fake projects, and inconsistent timelines.",
      icon: "⚠",
    },
    {
      title: "Interview Questions",
      description:
        "Auto-generated, skill-specific questions targeting weak or suspicious claims.",
      icon: "💬",
    },
  ];
  
  export default function Features() {
    return (
      <section className="relative px-6 py-24">
        {/* Background glow */}
        <div className="absolute inset-0 flex justify-center">
          <div className="w-[900px] h-[400px] bg-emerald-500/10 blur-[140px] rounded-full"></div>
        </div>
  
        <div className="relative z-10 max-w-7xl mx-auto text-center">
  
          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
            Evidence-based hiring decisions
          </h2>
  
          <p className="mt-4 text-white/60 max-w-2xl mx-auto">
            Every claim is verified. Every skill is validated. Every red flag is surfaced.
          </p>
  
          {/* Cards */}
          <div className="grid gap-6 mt-14 md:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div
                key={index}
                className="p-6 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md hover:border-emerald-400/30 hover:bg-white/[0.04] transition"
              >
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-emerald-500/10 flex items-center justify-center text-xl text-emerald-400 mb-5">
                  {feature.icon}
                </div>
  
                {/* Title */}
                <h3 className="text-lg font-medium mb-3 text-start">
                  {feature.title}
                </h3>
  
                {/* Description */}
                <p className="text-sm text-white/60 leading-relaxed text-start">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
  
        </div>
      </section>
    );
  }
  