export default function About() {
  return (
    <div className="bg-[#f5f7fb] min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden min-h-[70vh] flex items-center">
        {/* Background */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1800"
            alt="Badminton"
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/70"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6">
          <p className="text-blue-400 font-semibold uppercase tracking-[0.3em] mb-5">
            About SmashBooking
          </p>

          <h1 className="text-5xl md:text-7xl font-bold text-white leading-tight mb-8">
            Tempat Booking <br />
            Lapangan Badminton Modern
          </h1>

          <p className="text-gray-200 text-lg max-w-2xl leading-relaxed">
            SmashBooking hadir untuk memberikan pengalaman booking lapangan
            badminton yang mudah, cepat, nyaman, dan premium.
          </p>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-[35px] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1622279457486-62dcc4a431d6?q=80&w=1600"
                alt="Badminton Court"
                className="w-full h-[600px] object-cover hover:scale-105 transition-all duration-700"
              />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-10 -right-5 bg-white p-8 rounded-3xl shadow-xl w-72">
              <h3 className="text-4xl font-bold text-blue-600 mb-2">5+</h3>

              <p className="text-gray-600 leading-relaxed">
                Tahun pengalaman menyediakan lapangan badminton premium.
              </p>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-blue-600 font-semibold uppercase tracking-widest mb-4">
              Who We Are
            </p>

            <h2 className="text-5xl font-bold text-gray-900 leading-tight mb-8">
              Solusi Booking Lapangan Badminton Masa Kini
            </h2>

            <p className="text-gray-500 text-lg leading-relaxed mb-8">
              SmashBooking menyediakan sistem booking lapangan badminton modern
              dengan fasilitas premium, suasana nyaman, dan pelayanan terbaik.
            </p>

            <p className="text-gray-500 text-lg leading-relaxed mb-10">
              Kami percaya bahwa pengalaman bermain badminton harus didukung
              dengan tempat berkualitas, sistem booking praktis, dan fasilitas
              modern.
            </p>

            {/* Features */}
            <div className="space-y-5">
              <div className="flex items-start gap-5 bg-white p-6 rounded-3xl shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl">
                  🏸
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Lapangan Premium
                  </h3>

                  <p className="text-gray-500 leading-relaxed">
                    Indoor badminton court dengan kualitas terbaik dan
                    pencahayaan modern.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 bg-white p-6 rounded-3xl shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl">
                  ⚡
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Booking Cepat
                  </h3>

                  <p className="text-gray-500 leading-relaxed">
                    Sistem booking online yang mudah, cepat, dan praktis
                    digunakan.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 bg-white p-6 rounded-3xl shadow-sm">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl">
                  🌟
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Fasilitas Modern
                  </h3>

                  <p className="text-gray-500 leading-relaxed">
                    Area nyaman, ruang tunggu modern, dan suasana bermain
                    terbaik.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="bg-white py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-[#f5f7fb] p-10 rounded-[35px] text-center">
              <h2 className="text-6xl font-bold text-blue-600 mb-4">10+</h2>

              <p className="text-gray-600 text-lg">Lapangan Badminton</p>
            </div>

            <div className="bg-[#f5f7fb] p-10 rounded-[35px] text-center">
              <h2 className="text-6xl font-bold text-blue-600 mb-4">2K+</h2>

              <p className="text-gray-600 text-lg">Pelanggan Aktif</p>
            </div>

            <div className="bg-[#f5f7fb] p-10 rounded-[35px] text-center">
              <h2 className="text-6xl font-bold text-blue-600 mb-4">24/7</h2>

              <p className="text-gray-600 text-lg">Online Booking</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
