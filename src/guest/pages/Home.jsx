import Hero from "../components/Hero";
import BookingCard from "../components/BookingCard";
import { useState, useEffect } from "react";
import lapanganData from "../data/lapangan.json";

export default function Home() {
  const [courts, setCourts] = useState([]);

  useEffect(() => {
    setCourts(lapanganData);
  }, []);

  return (
    <div className="bg-[#f5f7fb] overflow-hidden">
      {/* Hero */}
      <Hero />

      {/* Lapangan */}
      <section className="max-w-7xl mx-auto px-6 py-28">
        <div className="text-center mb-20">
          <p className="text-blue-600 font-semibold uppercase tracking-[0.3em] mb-5">
            Lapangan Badminton
          </p>

          <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-6">
            Pilih Lapangan <br />
            Favoritmu
          </h2>

          <p className="text-gray-500 max-w-2xl mx-auto text-lg leading-relaxed">
            Nikmati pengalaman bermain badminton dengan lapangan yang nyaman,
            fasilitas lengkap, dan proses booking yang mudah.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-10">
          {courts.map((court) => (
            <BookingCard
              key={court.id}
              id={court.id}
              image={court.gambar}
              title={court.nama}
              price={court.harga}
              description={`${court.ukuran} • ${court.kapasitas}`}
            />
          ))}
        </div>
      </section>

      {/* About */}
      <section className="bg-white py-28">
        <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
          <div className="relative">
            <div className="overflow-hidden rounded-[40px] shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1600"
                alt="Badminton Court"
                className="w-full h-[650px] object-cover"
              />
            </div>

            <div className="absolute -bottom-10 -right-5 bg-white p-8 rounded-[30px] shadow-2xl w-72 border border-gray-100">
              <h3 className="text-5xl font-bold text-blue-600 mb-3">2</h3>

              <p className="text-gray-500 leading-relaxed">
                Lapangan badminton yang siap digunakan setiap hari.
              </p>
            </div>
          </div>

          <div>
            <p className="text-blue-600 font-semibold uppercase tracking-[0.3em] mb-5">
              Tentang Kami
            </p>

            <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-tight mb-8">
              GOR Badminton Modern
            </h2>

            <p className="text-gray-500 text-lg leading-relaxed mb-10">
              Kami menyediakan lapangan badminton yang nyaman dengan fasilitas
              lengkap untuk mendukung kegiatan olahraga dan latihan Anda.
            </p>

            <div className="space-y-6">
              <div className="flex items-start gap-5 bg-[#f5f7fb] p-6 rounded-[28px]">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl">
                  🏸
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Lapangan Berkualitas
                  </h3>

                  <p className="text-gray-500 leading-relaxed">
                    Ukuran lapangan sesuai standar permainan badminton.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-5 bg-[#f5f7fb] p-6 rounded-[28px]">
                <div className="w-16 h-16 rounded-2xl bg-blue-100 flex items-center justify-center text-3xl">
                  ⚡
                </div>

                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-2">
                    Booking Mudah
                  </h3>

                  <p className="text-gray-500 leading-relaxed">
                    Pemesanan lapangan dapat dilakukan secara cepat dan praktis.
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
                    Area parkir, musholla, kamar mandi, dan tempat duduk
                    penonton tersedia untuk kenyamanan pengunjung.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Statistik */}
      <section className="py-28">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-20">
            <p className="text-blue-600 font-semibold uppercase tracking-[0.3em] mb-5">
              Statistik
            </p>

            <h2 className="text-5xl font-bold text-gray-900 mb-5">
              Informasi Lapangan
            </h2>

            <p className="text-gray-500 max-w-2xl mx-auto text-lg">
              Informasi singkat mengenai fasilitas dan layanan yang tersedia.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-12 rounded-[35px] shadow-sm text-center">
              <h3 className="text-6xl font-bold text-blue-600 mb-4">2</h3>
              <p className="text-gray-500 text-lg">Lapangan Badminton</p>
            </div>

            <div className="bg-white p-12 rounded-[35px] shadow-sm text-center">
              <h3 className="text-6xl font-bold text-blue-600 mb-4">4</h3>
              <p className="text-gray-500 text-lg">Pemain per Lapangan</p>
            </div>

            <div className="bg-white p-12 rounded-[35px] shadow-sm text-center">
              <h3 className="text-6xl font-bold text-blue-600 mb-4">5</h3>
              <p className="text-gray-500 text-lg">Jam Operasional</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}