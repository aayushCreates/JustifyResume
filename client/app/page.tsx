import { Shield, GitBranch, AlertTriangle, MessageSquare, ArrowRight, CheckCircle } from 'lucide-react';

export default function JustifyResumeLanding() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200">
        <div className="container mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-gray-900 rounded-md flex items-center justify-center">
                <span className="text-white font-bold text-sm">JR</span>
              </div>
              <span className="text-lg font-semibold text-gray-900">JustifyResume</span>
            </div>
            
            <div className="hidden md:flex items-center gap-8">
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Home</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Analyze</a>
              <a href="#" className="text-gray-600 hover:text-gray-900 text-sm">Sample Report</a>
            </div>
            
            <div className="flex items-center gap-4">
              <button className="text-gray-700 text-sm font-medium">
                Sign In
              </button>
              <button className="bg-teal-600 hover:bg-teal-700 text-white px-5 py-2 rounded-md text-sm font-medium">
                Get Started
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-6 pt-24 pb-20">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 bg-teal-50 border border-teal-200 text-teal-700 px-4 py-2 rounded-full mb-8">
            <GitBranch className="w-4 h-4" />
            <span className="text-sm">Now with GitHub analysis</span>
          </div>
          
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-4 leading-tight">
            Don't trust resumes.
            <br />
            <span className="text-teal-600">Verify them.</span>
          </h1>
          
          <p className="text-lg text-gray-600 mb-10 max-w-2xl mx-auto">
            justifyResume uses AI to cross-check resume claims with real skill evidence
            from GitHub and projects. Stop guessing. Start knowing.
          </p>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-16">
            <button className="bg-gray-900 hover:bg-gray-800 text-white px-6 py-3 rounded-md font-medium flex items-center gap-2">
              Upload Resume
              <ArrowRight className="w-4 h-4" />
            </button>
            <button className="bg-white hover:bg-gray-50 text-gray-900 px-6 py-3 rounded-md font-medium border border-gray-300">
              View Sample Report
            </button>
          </div>
          
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-600" />
              <span>Trusted by 500+ tech companies</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-600" />
              <span>Analyzed 50,000+ resumes</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-teal-600" />
              <span>85% faster candidate screening</span>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-6 py-20">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Evidence-based hiring decisions
            </h2>
            <p className="text-lg text-gray-600">
              Every claim is verified. Every skill is validated. Every red flag is surfaced.
            </p>
          </div>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Feature 1 */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Resume Claim Verification
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Cross-reference every skill and experience claim against real evidence. No more taking resumes at face value.
              </p>
            </div>
            
            {/* Feature 2 */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <GitBranch className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                GitHub Intelligence
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Deep analysis of commit history, code quality, and project contributions to validate technical claims.
              </p>
            </div>
            
            {/* Feature 3 */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <AlertTriangle className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Fraud Risk Scoring
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                AI-powered detection of inflated claims, fake projects, and inconsistent timelines.
              </p>
            </div>
            
            {/* Feature 4 */}
            <div className="bg-white p-6 rounded-lg border border-gray-200">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <MessageSquare className="w-6 h-6 text-teal-600" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                Interview Questions
              </h3>
              <p className="text-sm text-gray-600 leading-relaxed">
                Auto-generated skill-specific questions targeting weak or suspicious claims.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-6 py-16 mb-20">
        <div className="max-w-3xl mx-auto bg-white rounded-2xl border border-gray-200 p-12 text-center">
          <div className="w-16 h-16 bg-teal-100 rounded-xl flex items-center justify-center mb-6 mx-auto">
            <Shield className="w-8 h-8 text-teal-600" />
          </div>
          
          <h2 className="text-3xl font-bold text-gray-900 mb-4">
            Ready to verify your next candidate?
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Upload a resume and get a comprehensive verification report in minutes.
          </p>
          
          <button className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-3 rounded-md font-medium inline-flex items-center gap-2">
            Get Started — It's Free
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-gray-200 bg-white">
        <div className="container mx-auto px-6 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-sm text-gray-600">
              © 2024 justifyResume. All rights reserved.
            </p>
            <div className="flex items-center gap-6">
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Privacy</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Terms</a>
              <a href="#" className="text-sm text-gray-600 hover:text-gray-900">Contact</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}