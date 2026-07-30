import { useState } from "react";
import FAQCard from "../components/FAQCard";
import { faqs } from "../data/faq";

const FAQ = () => {
  const [search, setSearch] = useState("");

  const filteredFaqs = faqs.filter((faq) =>
    faq.question.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <div className="text-center mb-12">
          <span className="inline-block px-4 py-1 rounded-full bg-blue-100 text-blue-600 font-semibold">
            Frequently Asked Questions
          </span>

          <h1 className="text-5xl font-bold mt-5 text-slate-800">
            How Can We Help?
          </h1>

          <p className="text-slate-600 mt-4 text-lg">
            Find answers to the most common questions about Himaaus.
          </p>
        </div>

        {/* Search */}
        <div className="mb-10">
          <input
            type="text"
            placeholder="Search a question..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-5 py-4 outline-none focus:ring-2 focus:ring-blue-500 shadow-sm"
          />
        </div>

        {/* FAQ Cards */}
        <div className="space-y-5">
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq) => (
              <FAQCard
                key={faq.id}
                question={faq.question}
                answer={faq.answer}
              />
            ))
          ) : (
            <div className="text-center text-slate-500 py-10">
              No matching questions found.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default FAQ;
