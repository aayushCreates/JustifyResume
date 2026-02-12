import type { NextPage } from "next";
import Head from "next/head";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Features from "./components/Features";
import Process from "./components/Process";
import Comparison from "./components/Comparison";
import FAQ from "./components/FAQ";
import Footer from "./components/Footer";


export default function Home() {
  return (
    <>
      <Head>
        <title>JustifyResume</title>
      </Head>

      <div className="min-h-screen bg-[#050b0a] text-white">
        <Navbar />
        <Hero />
        <Features />
        <Process />
        <Comparison />
        <FAQ />
        <Footer />
      </div>
    </>
  );
};