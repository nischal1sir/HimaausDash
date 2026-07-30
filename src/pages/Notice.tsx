import NoticeCard from "../components/NoticeCard";
import { notices } from "../data/notices";

const Notice = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">

        <div className="text-center mb-16">
          <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-semibold">
            Latest Updates
          </span>

          <h1 className="text-5xl font-bold text-slate-800 mt-5">
            Notices & Announcements
          </h1>

          <p className="mt-4 text-slate-600 text-lg">
            Stay updated with the latest news, admissions, events, and important announcements.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {notices.map((notice) => (
            <NoticeCard
              key={notice.id}
              title={notice.title}
              date={notice.date}
              description={notice.description}
            />
          ))}
        </div>

      </div>
    </div>
  );
};

export default Notice;