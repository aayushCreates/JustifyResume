type Step = {
    number: string;
    title: string;
    description: string;
    icon: string;
  };
  
  const steps: Step[] = [
    {
      number: "01",
      title: "Upload Resume",
      description:
        "Drop any resume PDF or paste a LinkedIn profile URL.",
      icon: "⬆",
    },
    {
      number: "02",
      title: "AI Analysis",
      description:
        "Our engine cross-references claims with real-world evidence.",
      icon: "⚙",
    },
    {
      number: "03",
      title: "Verification Report",
      description:
        "Get a detailed breakdown of verified vs unverified claims.",
      icon: "📄",
    },
    {
      number: "04",
      title: "Interview Ready",
      description:
        "Receive targeted questions to probe weak or suspicious claims.",
      icon: "💬",
    },
  ];
  
  export default function Process() {
    return (
      <section className="relative px-6 py-28 overflow-hidden">
  
        {/* Background grid feel */}
        <div className="absolute inset-0 opacity-[0.08] bg-[linear-gradient(to_right,#ffffff10_1px,transparent_1px),linear-gradient(to_bottom,#ffffff10_1px,transparent_1px)] bg-[size:40px_40px]" />
  
        <div className="relative z-10 max-w-7xl mx-auto text-center">
  
          {/* Badge */}
          <div className="inline-flex px-4 py-1.5 rounded-full text-xs tracking-wide border border-emerald-400/30 text-emerald-300 bg-emerald-400/10 mb-6">
            HOW IT WORKS
          </div>
  
          {/* Heading */}
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-semibold">
            From upload to insight in minutes
          </h2>
  
          <p className="mt-4 text-white/60 max-w-2xl mx-auto">
            Our AI-powered verification process is fast, thorough, and designed for busy hiring teams.
          </p>
  
          {/* Steps */}
          <div className="relative mt-16 grid gap-8 lg:grid-cols-4">
  
            {/* Desktop connector line */}
            <div className="hidden lg:block absolute top-10 left-0 w-full h-[1px] bg-white/10"></div>
  
            {steps.map((step, index) => (
              <div
                key={index}
                className="relative p-6 rounded-xl border border-white/10 bg-white/[0.02] backdrop-blur-md hover:border-emerald-400/30 transition text-left"
              >
                {/* Step Number Bubble */}
                <div className="absolute -top-4 right-4 w-9 h-9 rounded-full bg-emerald-400 text-black text-xs font-semibold flex items-center justify-center">
                  {step.number}
                </div>
  
                {/* Icon */}
                <div className="w-12 h-12 rounded-lg bg-emerald-400/10 text-emerald-400 flex items-center justify-center mb-5 text-xl">
                  {step.icon}
                </div>
  
                {/* Title */}
                <h3 className="text-lg font-medium mb-3">
                  {step.title}
                </h3>
  
                {/* Description */}
                <p className="text-sm text-white/60 leading-relaxed">
                  {step.description}
                </p>
  
              </div>
            ))}
  
          </div>
        </div>
      </section>
    );
  }
  