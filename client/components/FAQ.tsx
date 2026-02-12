import { useState } from "react";

type FAQItem = {
  question: string;
  answer: string;
};

const faqs: FAQItem[] = [
  {
    question: "How does JustifyResume verify resume claims?",
    answer:
      "We analyze GitHub repositories, commit history, and project contributions to validate technical claims and skills.",
  },
  {
    question: "What file formats do you support?",
    answer:
      "You can upload PDF resumes or provide LinkedIn profile URLs for analysis.",
  },
  {
    question: "How accurate is the fraud detection?",
    answer:
      "Our AI model provides high-confidence fraud detection with continuous improvement from real-world hiring data.",
  },
  {
    question: "Is candidate data secure?",
    answer:
      "Yes. All uploaded data is encrypted and handled with strict privacy and security standards.",
  },
  {
    question: "Can I integrate with my ATS?",
    answer:
      "Yes, we provide integrations and APIs for popular applicant tracking systems.",
  },
  {
    question: "How long does analysis take?",
    answer:
      "Most resume analyses complete in under 2 minutes depending on repository size.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  function toggle(index: number) {
    if (openIndex === index) {
      setOpenIndex(null);
    } else {
      setOpenIndex(index);
    }
  }

  return (
    <section className="relative px-6 py-28">

      <div className="max-w-3xl mx-auto text-center">

        {/* Badge */}
        <div className="inline-flex px-4 py-1.5 rounded-full text-xs border border-white/10 bg-white/5 mb-6">
          FAQ
        </div>

        {/* Heading */}
        <h2 className="text-3xl md:text-4xl font-semibold">
          Frequently asked questions
        </h2>

        <p className="mt-4 text-white/60">
          Everything you need to know about JustifyResume and how it works.
        </p>

        {/* Accordion */}
        <div className="mt-12 flex flex-col gap-4 text-left">

          {faqs.map((faq, index) => {
            const isOpen = openIndex === index;

            return (
              <div
                key={index}
                className="border border-white/10 rounded-lg bg-white/[0.02] overflow-hidden"
              >
                <button
                  onClick={() => toggle(index)}
                  className="w-full flex justify-between items-center px-5 py-4 text-sm md:text-base"
                >
                  <span>{faq.question}</span>
                  <span className="text-white/60">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-sm text-white/60 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}

        </div>

      </div>
    </section>
  );
}
