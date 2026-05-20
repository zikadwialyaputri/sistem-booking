import Hero from "../components/Hero";
import BookingCard from "../components/BookingCard";

export default function Home() {
  return (
    <div className="bg-[#f5f7fb] overflow-hidden">
      {/* Hero */}
      <Hero />

      {/* Premium Court */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        {/* Heading */}
        <div className="text-center mb-20">
          <p className="text-blue-600 font-semibold uppercase tracking-[0.3em] mb-5">
            Premium Court
          </p>

          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Pilih Lapangan <br />
            Favoritmu
          </h2>

          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Nikmati pengalaman bermain badminton dengan lapangan indoor premium,
            fasilitas modern, dan suasana nyaman.
          </p>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-2 gap-10">
          <BookingCard
            image="https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?q=80&w=1400&auto=format&fit=crop"
            title="Lapangan Indoor A"
            price="Rp50.000 / jam"
          />

          <BookingCard
            image="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1400&auto=format&fit=crop"
            title="Lapangan Premium B"
            price="Rp75.000 / jam"
          />
        </div>
      </section>

      {/* About Section */}
      <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          {/* Image */}
          <div className="relative">
            <div className="overflow-hidden rounded-[40px] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1544717305-2782549b5136?q=80&w=1600"
                alt="Badminton"
                className="w-full h-[650px] object-cover hover:scale-105 transition-all duration-700"
              />
            </div>

            {/* Floating Card */}
            <div className="absolute -bottom-10 -right-5 bg-white p-8 rounded-[30px] shadow-2xl w-72 border border-gray-100">
              <h3 className="text-5xl font-bold text-blue-600 mb-3">5+</h3>

              <p className="text-gray-500 leading-relaxed">
                Tahun pengalaman menyediakan lapangan badminton premium.
              </p>
            </div>
          </div>

          {/* Content */}
          <div>
            <p className="text-blue-600 font-semibold uppercase tracking-[0.3em] mb-5">
              About SmashBooking
            </p>

            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-8">
              Tempat Bermain Badminton Modern
            </h2>

            <p className="text-gray-500 text-lg leading-relaxed mb-10">
              SmashBooking hadir untuk memberikan pengalaman booking lapangan
              badminton yang cepat, nyaman, dan modern dengan fasilitas premium.
            </p>

            {/* Features */}
            <div className="space-y-6">
              <div className="flex items-start gap-5 bg-[#f5f7fb] p-6 rounded-[28px]">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl">
                  🏸
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Lapangan Premium
                  </h3>

                  <p className="text-gray-500 leading-relaxed">
                    Indoor badminton court dengan kualitas terbaik.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 bg-[#f5f7fb] p-6 rounded-[28px]">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl">
                  ⚡
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Booking Cepat
                  </h3>

                  <p className="text-gray-500 leading-relaxed">
                    Sistem booking online mudah dan praktis.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 bg-[#f5f7fb] p-6 rounded-[28px]">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl">
                  🌟
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Fasilitas Lengkap
                  </h3>

                  <p className="text-gray-500 leading-relaxed">
                    Ruang tunggu nyaman dan suasana modern.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistics */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-20">
            <p className="text-blue-600 font-semibold uppercase tracking-[0.3em] mb-5">
              Statistics
            </p>

            <h2 className="text-5xl font-bold text-gray-900 mb-5">
              Dipercaya Banyak Pemain
            </h2>

            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              SmashBooking telah menjadi pilihan utama pemain badminton untuk
              booking lapangan premium.
            </p>
          </div>

          {/* Stats */}
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-12 rounded-[35px] shadow-sm text-center hover:shadow-2xl transition-all duration-500">
              <h3 className="text-6xl font-bold text-blue-600 mb-4">10+</h3>

              <p className="text-gray-500 text-lg">Lapangan Premium</p>
            </div>

            <div className="bg-white p-12 rounded-[35px] shadow-sm text-center hover:shadow-2xl transition-all duration-500">
              <h3 className="text-6xl font-bold text-blue-600 mb-4">2K+</h3>

              <p className="text-gray-500 text-lg">Pelanggan Aktif</p>
            </div>

            <div className="bg-white p-12 rounded-[35px] shadow-sm text-center hover:shadow-2xl transition-all duration-500">
              <h3 className="text-6xl font-bold text-blue-600 mb-4">24/7</h3>

              <p className="text-gray-500 text-lg">Booking Online</p>
            </div>
          </div>
        </div>
      </section>

      {/* Guestbook */}
      <section className="bg-white py-28 overflow-hidden">
        <div className="max-w-7xl mx-auto px-6">
          {/* Heading */}
          <div className="text-center mb-20">
            <p className="text-blue-600 font-semibold uppercase tracking-[0.3em] mb-5">
              Our Guestbook
            </p>

            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
              Apa Kata Mereka <br />
              Tentang SmashBooking
            </h2>

            <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
              Pengalaman bermain terbaik dari pelanggan yang telah menggunakan
              layanan booking lapangan badminton kami.
            </p>
          </div>

          {/* Cards */}
          <div className="grid lg:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="bg-[#f5f7fb] p-8 rounded-[35px] hover:shadow-2xl transition-all duration-500">
              <div className="flex gap-1 text-yellow-400 text-2xl mb-6">
                ★★★★★
              </div>

              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                “Lapangannya bersih dan nyaman banget. Booking juga gampang dan
                cepat.”
              </p>

              <div className="flex items-center gap-4">
                <img
                  src="https://randomuser.me/api/portraits/men/32.jpg"
                  alt="Guest"
                  className="w-16 h-16 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    Rizky Pratama
                  </h3>

                  <p className="text-gray-500">Atlet Badminton</p>
                </div>
              </div>
            </div>

            {/* Card 2 */}
            <div className="bg-blue-600 p-8 rounded-[35px] text-white hover:shadow-2xl transition-all duration-500 scale-105">
              <div className="flex gap-1 text-yellow-300 text-2xl mb-6">
                ★★★★★
              </div>

              <p className="leading-relaxed mb-8 text-lg text-blue-100">
                “Fasilitas premium dan suasananya modern. Booking lapangan jadi
                lebih praktis.”
              </p>

              <div className="flex items-center gap-4">
                <img
                  src="https://randomuser.me/api/portraits/women/44.jpg"
                  alt="Guest"
                  className="w-16 h-16 rounded-full object-cover border-2 border-white"
                />

                <div>
                  <h3 className="font-bold text-lg">Amanda Putri</h3>

                  <p className="text-blue-200">Professional Player</p>
                </div>
              </div>
            </div>

            {/* Card 3 */}
            <div className="bg-[#f5f7fb] p-8 rounded-[35px] hover:shadow-2xl transition-all duration-500">
              <div className="flex gap-1 text-yellow-400 text-2xl mb-6">
                ★★★★★
              </div>

              <p className="text-gray-600 leading-relaxed mb-8 text-lg">
                “Pelayanan ramah dan sistem booking online sangat membantu
                mencari jadwal kosong.”
              </p>

              <div className="flex items-center gap-4">
                <img
                  src="https://randomuser.me/api/portraits/men/75.jpg"
                  alt="Guest"
                  className="w-16 h-16 rounded-full object-cover"
                />

                <div>
                  <h3 className="font-bold text-gray-900 text-lg">
                    Dimas Saputra
                  </h3>

                  <p className="text-gray-500">Community Member</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
