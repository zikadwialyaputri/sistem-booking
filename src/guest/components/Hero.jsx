import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center overflow-hidden"
      style={{
        backgroundImage: "url('/img/header.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-slate-950/95 via-slate-950/80 to-blue-950/50"></div>

      {/* Glow Effects */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-blue-500/20 blur-[150px] rounded-full animate-pulse"></div>

      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-cyan-400/10 blur-[180px] rounded-full animate-pulse"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6 w-full">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* LEFT */}
          <div>
            {/* Badge */}
            <div className="inline-flex items-center gap-3 bg-white/10 backdrop-blur-xl border border-white/20 rounded-full px-5 py-3 mb-8">
              <span className="w-3 h-3 bg-green-400 rounded-full animate-ping"></span>

              <span className="text-sm text-gray-200 tracking-wide">
                Sistem Booking Resmi GOR Gabus Pekanbaru
              </span>
            </div>

            {/* Title */}
            <h1 className="text-5xl md:text-7xl font-black text-white leading-tight mb-8">
              Main
              <span className="block text-blue-400">
                Badminton
              </span>
              Lebih Mudah
            </h1>

            <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-10 max-w-2xl">
              Booking lapangan badminton favoritmu secara online tanpa antre.
              Nikmati fasilitas modern, lapangan nyaman, dan pengalaman bermain
              terbaik di GOR Gabus Pekanbaru.
            </p>

            {/* Buttons */}
            <div className="flex flex-wrap gap-5 mb-12">
              <Link
                to="/booking"
                className="group bg-blue-600 hover:bg-blue-700 px-8 py-4 rounded-2xl text-white font-semibold shadow-2xl shadow-blue-900/40 transition-all duration-500 hover:scale-105"
              >
                Booking Sekarang

                <span className="ml-2 inline-block group-hover:translate-x-2 transition">
                  →
                </span>
              </Link>

              <a
                href="#about"
                className="px-8 py-4 rounded-2xl border border-white/30 text-white backdrop-blur-md hover:bg-white hover:text-slate-900 transition-all duration-500"
              >
                Tentang Kami
              </a>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-3 gap-5 max-w-xl">
              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-5 text-center">
                <h3 className="text-4xl font-bold text-blue-400 mb-2">
                  2
                </h3>

                <p className="text-gray-300 text-sm">
                  Lapangan
                </p>
              </div>

              <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-5 text-center">
                <h3 className="text-4xl font-bold text-blue-400 mb-2">
                  4
                </h3>

                <p className="text-gray-300 text-sm">
                  Pemain
                </p>
              </div>

            </div>
          </div>

          {/* RIGHT CARD */}
          <div className="hidden lg:flex justify-end">
            <div className="bg-white/10 backdrop-blur-2xl border border-white/20 rounded-[35px] p-8 w-[420px] shadow-2xl">
              <div className="mb-6">
                <span className="text-blue-400 text-sm font-semibold tracking-widest uppercase">
                  Lokasi
                </span>

                <h3 className="text-3xl font-bold text-white mt-3">
                  GOR Gabus
                </h3>
              </div>

              <p className="text-gray-300 leading-relaxed mb-8">
                HC5P+GC7, Jl. Kayangan Gg. Gabus, Meranti Pandak, Rumbai,
                Kota Pekanbaru, Riau.
              </p>

              <div className="space-y-4">
                <div className="bg-white/10 rounded-2xl p-5">
                  <h4 className="text-white font-semibold mb-2">
                    🏸 Lapangan Indoor
                  </h4>

                  <p className="text-gray-400 text-sm">
                    Lapangan badminton nyaman dengan pencahayaan optimal.
                  </p>
                </div>

                <div className="bg-white/10 rounded-2xl p-5">
                  <h4 className="text-white font-semibold mb-2">
                    ⚡ Booking Online
                  </h4>

                  <p className="text-gray-400 text-sm">
                    Reservasi cepat dan praktis tanpa harus datang langsung.
                  </p>
                </div>

                <div className="bg-white/10 rounded-2xl p-5">
                  <h4 className="text-white font-semibold mb-2">
                    🚗 Fasilitas Lengkap
                  </h4>

                  <p className="text-gray-400 text-sm">
                    Parkir, musholla, kamar mandi, dan area tunggu.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#f5f7fb] via-[#f5f7fb]/70 to-transparent"></div>
    </section>
  );
}