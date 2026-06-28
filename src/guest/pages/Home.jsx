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
    <div className="min-h-screen bg-slate-50">
      <main>
        {/* HERO */}
        <section id="home">
          <Hero />
        </section>

        {/* BOOKING */}
        <section id="booking" className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center mb-16">
            <span className="inline-block px-5 py-2 rounded-full bg-blue-100 text-blue-600 font-medium mb-6">
              Reservasi Lapangan
            </span>

            <h2 className="text-5xl font-bold text-slate-900 mb-6">
              Pilih Lapangan
              <span className="text-blue-600"> Terbaik</span>
            </h2>

            <p className="text-slate-500 text-lg max-w-3xl mx-auto leading-relaxed">
              SmashBooking memudahkan Anda melakukan reservasi lapangan
              badminton di GOR Gabus Pekanbaru dengan proses cepat, jadwal yang
              jelas, dan sistem booking yang praktis.
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

        {/* TENTANG */}
        <section id="about" className="bg-white py-28">
          <div className="max-w-7xl mx-auto px-6 grid lg:grid-cols-2 gap-20 items-center">
            <div className="relative">
              <img
                src="/img/gor.jpg"
                alt="GOR Gabus"
                className="w-full h-[600px] object-cover rounded-[36px] shadow-xl"
              />

              <div className="absolute -bottom-8 right-6 bg-white rounded-[24px] p-6 shadow-xl">
                <h3 className="text-4xl font-bold text-blue-600">2</h3>

                <p className="text-slate-500 text-sm">
                  Lapangan aktif setiap hari
                </p>
              </div>
            </div>

            <div>
              <span className="inline-block px-5 py-2 rounded-full bg-blue-100 text-blue-600 font-medium mb-6">
                Tentang GOR Gabus
              </span>

              <h2 className="text-5xl font-bold text-slate-900 mb-8">
                Tempat Bermain
                <br />
                Badminton yang Nyaman
              </h2>

              <p className="text-slate-500 text-lg leading-relaxed mb-10">
                GOR Gabus Pekanbaru menyediakan fasilitas olahraga badminton
                yang nyaman untuk latihan, sparing, maupun pertandingan
                persahabatan. Sistem SmashBooking hadir untuk mempermudah proses
                reservasi lapangan secara online.
              </p>

              <div className="space-y-4">
                <div className="bg-slate-50 p-6 rounded-3xl">
                  <h3 className="font-semibold text-lg mb-2">
                    🏸 Lapangan Berkualitas
                  </h3>

                  <p className="text-slate-500">
                    Permukaan lapangan terawat dan nyaman digunakan.
                  </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-3xl">
                  <h3 className="font-semibold text-lg mb-2">
                    ⚡ Booking Online
                  </h3>

                  <p className="text-slate-500">
                    Reservasi lebih mudah tanpa harus datang langsung.
                  </p>
                </div>

                <div className="bg-slate-50 p-6 rounded-3xl">
                  <h3 className="font-semibold text-lg mb-2">
                    🚗 Fasilitas Pendukung
                  </h3>

                  <p className="text-slate-500">
                    Area parkir, ruang tunggu, toilet dan fasilitas umum
                    lainnya.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* STATISTIK */}
        <section className="py-28">
          <div className="max-w-7xl mx-auto px-6">
            <div className="text-center mb-16">
              <span className="inline-block px-5 py-2 rounded-full bg-blue-100 text-blue-600 font-medium mb-6">
                Statistik
              </span>

              <h2 className="text-5xl font-bold text-slate-900">
                Informasi GOR Gabus
              </h2>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              <div className="bg-white rounded-[30px] p-10 text-center shadow-lg hover:-translate-y-2 transition-all duration-300">
                <div className="text-5xl mb-4">🏸</div>

                <h3 className="text-5xl font-bold text-blue-600 mb-3">2</h3>

                <p className="text-slate-500">Lapangan Badminton</p>
              </div>

              <div className="bg-white rounded-[30px] p-10 text-center shadow-lg hover:-translate-y-2 transition-all duration-300">
                <div className="text-5xl mb-4">👥</div>

                <h3 className="text-5xl font-bold text-blue-600 mb-3">4</h3>

                <p className="text-slate-500">Pemain per Lapangan</p>
              </div>

              <div className="bg-white rounded-[30px] p-10 text-center shadow-lg hover:-translate-y-2 transition-all duration-300">
                <div className="text-5xl mb-4">⏰</div>

                <h3 className="text-5xl font-bold text-blue-600 mb-3">5</h3>

                <p className="text-slate-500">Jam Operasional</p>
              </div>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
