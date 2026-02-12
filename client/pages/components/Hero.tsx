

export default function Hero() {
    return (
      <section className="relative flex flex-col items-center justify-center text-center px-6 py-32 overflow-hidden">
  
        {/* Background Glow */}
        <div className="absolute inset-0 flex justify-center">
          <div className="w-[300px] h-[200px] bg-emerald-500/20 blur-[160px] rounded-full mt-10"></div>
        </div>
  
        <div className="relative z-10 max-w-3xl">
  
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 mb-8 text-sm border border-emerald-500/30 rounded-full bg-emerald-500/10 text-emerald-300">
            ✨ Now with GitHub analysis
          </div>
  
          {/* Heading */}
          <h1 className="text-5xl md:text-6xl font-semibold leading-tight">
            Don't trust resumes.
            <br />
            <span className="text-emerald-400">Verify them.</span>
          </h1>
  
          {/* Description */}
          <p className="mt-6 text-white/70 text-lg">
            JustifyResume uses AI to cross-check resume claims with real skill
            evidence from GitHub and projects. Stop guessing. Start knowing.
          </p>
  
          {/* Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mt-10">
            <button className="px-6 py-3 rounded-lg bg-white text-black font-medium hover:bg-white/90 transition">
              Upload Resume →
            </button>
  
            <button className="px-6 py-3 rounded-lg border border-white/20 hover:bg-white/5 transition">
              View Sample Report
            </button>
          </div>
  
          {/* Stats */}
          <div className="flex flex-col md:flex-row gap-6 justify-center mt-10 text-sm text-white/60">
  
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">✔</span>
              Trusted by 500+ tech companies
            </div>
  
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">✔</span>
              Analyzed 50,000+ resumes
            </div>
  
            <div className="flex items-center gap-2">
              <span className="text-emerald-400">✔</span>
              85% faster candidate screening
            </div>
  
          </div>
  
        </div>
      </section>
    );
  }
  