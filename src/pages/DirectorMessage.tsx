const DirectorMessage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 py-16 px-6">
      <div className="max-w-6xl mx-auto">

        {/* Heading */}
        <div className="text-center mb-16">
          <span className="bg-blue-100 text-blue-600 px-4 py-2 rounded-full font-semibold">
            Director's Message
          </span>

          <h1 className="text-5xl font-bold text-slate-800 mt-5">
            Welcome to Himaaus
          </h1>

          <p className="mt-4 text-slate-600 text-lg">
            Empowering students with trusted guidance for a brighter future.
          </p>
        </div>

        {/* Card */}
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden grid md:grid-cols-2">

          {/* Left */}
          <div className="bg-blue-600 flex items-center justify-center p-10">

            <div className="text-center">
              <img
                src="https://via.placeholder.com/300x350"
                alt="Director"
                className="rounded-2xl shadow-lg mx-auto"
              />

              <h2 className="text-white text-2xl font-bold mt-6">
                Director Name
              </h2>

              <p className="text-blue-100">
                Managing Director
              </p>
            </div>

          </div>

          {/* Right */}
          <div className="p-10">

            <h2 className="text-3xl font-bold text-slate-800 mb-6">
              A Message From Our Director
            </h2>

            <p className="text-slate-600 leading-8 mb-6">
              Welcome to Himaaus. Our mission is to help students achieve
              their dreams of studying abroad through honest guidance,
              personalized support, and professional counseling.
            </p>

            <p className="text-slate-600 leading-8 mb-6">
              We believe every student deserves the opportunity to build
              a successful future. Our experienced team works closely with
              each student from university selection to visa processing.
            </p>

            <div className="border-l-4 border-blue-600 pl-5 italic text-slate-700">
              "Education opens doors to endless opportunities. Let us
              guide you toward your future."
            </div>

            <div className="mt-10">
              <h3 className="font-bold text-xl text-slate-800">
                Director Name
              </h3>

              <p className="text-slate-500">
                Himaaus Education Consultancy
              </p>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default DirectorMessage;