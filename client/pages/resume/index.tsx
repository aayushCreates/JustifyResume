import AnalyzeResume from "../../components/AnalyzeResume";
import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Toaster } from "sonner";

export default function Page() {
  return (
    <div>
      <Toaster position="top-right" />
      <Navbar />
      <AnalyzeResume />
      <Footer />
    </div>
  );
}
