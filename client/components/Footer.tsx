export default function CTA() {
  return (
    <section className="relative pb-6">
      <div className="px-7 mx-auto">
        {/* Footer */}
        <footer className="mt-16 flex flex-col md:flex-row justify-between items-center text-sm text-white/40 gap-4">
          <div>© 2024 JustifyResume. All rights reserved.</div>

          <div className="flex gap-6">
            <a className="hover:text-white transition">Privacy</a>
            <a className="hover:text-white transition">Terms</a>
            <a className="hover:text-white transition">Contact</a>
          </div>
        </footer>
      </div>
    </section>
  );
}
