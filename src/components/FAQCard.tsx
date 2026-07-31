import { useState } from "react";
import { ChevronDown } from "lucide-react";

interface FAQCardProps {
  question: string;
  answer: string;
}

const FAQCard = ({ question, answer }: FAQCardProps) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="group rounded-2xl border border-slate-200 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-blue-500 hover:shadow-xl">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex w-full items-center justify-between p-6 text-left"
      >
        <h3 className="text-lg font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">
          {question}
        </h3>

        <ChevronDown
          size={22}
          className={`text-blue-600 transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>

      <div
        className={`overflow-hidden transition-all duration-300 ${
          isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
        }`}
      >
        <div className="px-6 pb-6">
          <div className="mb-4 h-px bg-slate-200"></div>

          <p className="leading-7 text-slate-600">
            {answer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default FAQCard;

