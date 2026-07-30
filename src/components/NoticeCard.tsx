interface NoticeCardProps {
  title: string;
  date: string;
  description: string;
}

const NoticeCard = ({ title, date, description }: NoticeCardProps) => {
  return (
    <div className="group rounded-2xl bg-white shadow-md border border-slate-200 p-6 transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:border-blue-500">
      <span className="inline-block px-3 py-1 text-sm font-semibold rounded-full bg-blue-100 text-blue-600">
        Notice
      </span>

      <h2 className="text-2xl font-bold text-slate-800 mt-4 group-hover:text-blue-600 transition-colors">
        {title}
      </h2>

      <p className="text-sm text-slate-500 mt-2">
        📅 {date}
      </p>

      <p className="text-slate-600 mt-4 leading-7">
        {description}
      </p>

      <button className="mt-6 text-blue-600 font-semibold hover:text-blue-800 transition">
        Read More →
      </button>
    </div>
  );
};

export default NoticeCard;
