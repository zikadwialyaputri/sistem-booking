export default function About() {
  const stats = [
    { value: "2", label: "Lapangan Badminton" },
    { value: "500+", label: "Pelanggan" },
    { value: "24/7", label: "Booking Online" },
  ];

  const features = [
    {
      number: "01",
      title: "Lapangan Berkualitas",
      desc: "Lapangan indoor dengan standar pertandingan dan pencahayaan optimal untuk kenyamanan bermain.",
    },
    {
      number: "02",
      title: "Booking Online",
      desc: "Reservasi lapangan lebih cepat dan praktis langsung dari website kapan saja.",
    },
    {
      number: "03",
      title: "Parkir Memadai",
      desc: "Area parkir aman dan nyaman untuk kendaraan roda dua maupun roda empat.",
    },
    {
      number: "04",
      title: "Musholla Nyaman",
      desc: "Fasilitas ibadah yang bersih dan terawat untuk seluruh pengunjung.",
    },
  ];

  return (
    <div className="bg-white overflow-hidden">
      {/* HERO */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
        <img
          src="/img/gorgabus.jpg"
          alt="Badminton"
          className="absolute inset-0 h-full w-full object-cover"
        />

        <div className="absolute inset-0 bg-black/70" />

        <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-blue-500/20 blur-[150px] rounded-full" />
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-cyan-400/20 blur-[150px] rounded-full" />
        <div className="relative z-10 max-w-6xl mx-auto px-6 text-center">
          <span className="inline-flex items-center px-5 py-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-md text-white text-sm tracking-[0.2em] uppercase">
            GOR Gabus Pekanbaru
          </span>

          <h1 className="mt-8 text-5xl md:text-7xl lg:text-8xl font-black text-white leading-tight">
            Main Badminton
            <span className="block text-cyan-400">Lebih Mudah</span>
          </h1>

          <p className="mt-8 max-w-3xl mx-auto text-lg md:text-xl text-white/80 leading-relaxed">
            Nikmati pengalaman booking lapangan badminton yang cepat, modern,
            dan nyaman dengan fasilitas terbaik di Pekanbaru.
          </p>

          <div className="mt-10 flex flex-wrap justify-center gap-4">
            <a
              href="/booking"
              className="px-8 py-4 rounded-2xl bg-blue-500 text-white font-semibold hover:bg-blue-600 hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(16,185,129,0.4)] transition-all duration-300"
            >
              Booking Sekarang
            </a>

            <a
              href="#about"
              className="px-8 py-4 rounded-2xl border border-white/20 bg-white/10 backdrop-blur-md text-white hover:bg-white/20 transition-all duration-300"
            >
              Pelajari Lebih Lanjut
            </a>
          </div>
        </div>
      </section>
      <section className="relative -mt-24 z-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-6">
            {stats.map((item, index) => (
              <div
                key={index}
                className="bg-white rounded-[32px] p-8 shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-slate-100 hover:-translate-y-2 transition-all duration-500"
              >
                <h3 className="text-5xl font-black text-blue-600">
                  {item.value}
                </h3>

                <p className="mt-3 text-slate-500">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* ABOUT */}
      <section
        id="about"
        className="py-32 bg-gradient-to-b from-white via-slate-50 to-white"
      >
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500/30 to-green-400/30 rounded-[40px] blur-2xl opacity-50 group-hover:opacity-100 transition duration-700"></div>

              <img
                src="/img/about.jpg"
                alt="Badminton Court"
                className="relative h-[650px] w-full object-cover rounded-[40px] shadow-2xl group-hover:scale-[1.03] transition duration-700"
              />

              <div className="absolute bottom-8 left-8 bg-white/90 backdrop-blur-xl px-6 py-4 rounded-3xl shadow-xl">
                <h4 className="text-3xl font-black text-blue-600">2</h4>
                <p>Lapangan Aktif</p>
              </div>
            </div>

            <div>
              <span className="inline-flex px-4 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold tracking-widest text-xs uppercase">
                Tentang Kami
              </span>

              <h2 className="mt-8 text-5xl md:text-6xl font-black text-slate-900 leading-tight">
                Tempat Bermain
                <span className="block text-blue-600">Badminton Modern</span>
              </h2>

              <p className="mt-8 text-slate-600 text-lg leading-relaxed">
                SmashBooking hadir untuk menghadirkan pengalaman reservasi
                lapangan badminton yang lebih cepat, modern, dan efisien.
              </p>

              <p className="mt-6 text-slate-600 text-lg leading-relaxed">
                Dengan fasilitas berkualitas, sistem digital yang mudah
                digunakan, dan pelayanan profesional, kami ingin menjadi pilihan
                utama pecinta badminton di Pekanbaru.
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* FITUR */}
      <section className="relative py-32 overflow-hidden bg-slate-50">
        <div className="absolute top-20 left-10 w-72 h-72 bg-blue-200 rounded-full blur-[140px] opacity-40"></div>

        <div className="absolute bottom-20 right-10 w-72 h-72 bg-green-200 rounded-full blur-[140px] opacity-40"></div>

        <div className="max-w-7xl mx-auto px-6 relative z-10">
          <div className="text-center mb-20">
            <span className="inline-flex px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold tracking-widest uppercase">
              Fasilitas Unggulan
            </span>

            <h2 className="mt-6 text-5xl md:text-6xl font-black text-slate-900">
              Kenapa Memilih Kami?
            </h2>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((item, index) => (
              <div
                key={index}
                className="
          group
          relative
          overflow-hidden
          rounded-[32px]
          border
          border-white
          bg-white/70
          backdrop-blur-xl
          p-8
          shadow-[0_15px_40px_rgba(0,0,0,0.05)]
          hover:-translate-y-4
          hover:shadow-[0_30px_80px_rgba(16,185,129,0.12)]
          transition-all
          duration-700
          "
              >
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-blue-100 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition duration-700"></div>

                <span className="text-5xl font-black text-blue-100">
                  {item.number}
                </span>

                <h3 className="mt-8 text-2xl font-bold text-slate-900">
                  {item.title}
                </h3>

                <p className="mt-4 text-slate-500 leading-relaxed">
                  {item.desc}
                </p>

                <div className="mt-8 h-[3px] w-12 bg-blue-500 rounded-full group-hover:w-24 transition-all duration-500"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* VISI MISI */}
      <section className="py-32 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <span className="inline-flex px-4 py-2 rounded-full bg-blue-100 text-blue-700 text-sm font-semibold tracking-widest uppercase">
              Visi & Misi
            </span>

            <h2 className="mt-6 text-5xl md:text-6xl font-black text-slate-900">
              Komitmen Kami
            </h2>
          </div>

          <div className="grid lg:grid-cols-2 gap-10">
            <div className="group relative overflow-hidden rounded-[40px] bg-gradient-to-br from-blue-500 to-blue-700 p-12 text-white shadow-2xl hover:-translate-y-3 transition duration-700">
              <div className="absolute -top-20 -right-20 w-64 h-64 bg-white/10 rounded-full blur-3xl"></div>

              <span className="text-white/50 text-sm tracking-[0.3em] uppercase">
                Visi
              </span>

              <h3 className="mt-4 text-5xl font-black">Menjadi yang Terbaik</h3>

              <p className="mt-8 text-lg leading-relaxed text-blue-50">
                Menjadi pusat olahraga badminton terbaik di Pekanbaru yang
                menggabungkan fasilitas modern, pelayanan profesional, dan
                teknologi digital untuk memberikan pengalaman bermain yang
                nyaman bagi semua kalangan.
              </p>
            </div>

            <div className="group relative overflow-hidden rounded-[40px] bg-slate-950 p-12 text-white shadow-2xl hover:-translate-y-3 transition duration-700">
              <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl"></div>

              <span className="text-white/50 text-sm tracking-[0.3em] uppercase">
                Misi
              </span>

              <h3 className="mt-4 text-5xl font-black">
                Memberikan Pengalaman Terbaik
              </h3>

              <p className="mt-8 text-lg leading-relaxed text-slate-300">
                Menyediakan lapangan berkualitas, sistem reservasi yang mudah
                digunakan, serta fasilitas pendukung yang lengkap agar setiap
                pemain dapat menikmati pengalaman olahraga yang lebih baik.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative overflow-hidden py-32 bg-slate-950">
        <div className="absolute inset-0">
          <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-blue-500/10 rounded-full blur-[180px]"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto text-center px-6">
          <span className="inline-flex px-4 py-2 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-white text-sm tracking-widest uppercase">
            Booking Sekarang
          </span>

          <h2 className="mt-8 text-5xl md:text-7xl font-black text-white leading-tight">
            Siap Bermain
            <span className="block text-blue-400">Hari Ini?</span>
          </h2>

          <p className="mt-8 text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
            Nikmati pengalaman bermain badminton terbaik dengan fasilitas modern
            dan sistem reservasi online yang cepat.
          </p>

          <div className="mt-12">
            <a
              href="/booking"
              className="
        inline-flex
        items-center
        gap-3
        px-10
        py-5
        rounded-2xl
        bg-blue-500
        text-white
        font-semibold
        hover:bg-blue-600
        hover:scale-105
        hover:shadow-[0_25px_60px_rgba(16,185,129,0.35)]
        transition-all
        duration-500
        "
            >
              Booking Lapangan
              <span>→</span>
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}
