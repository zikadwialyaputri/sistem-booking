import { useState, useEffect } from "react";
import BookingCard from "../components/BookingCard";
import { supabase } from "../../lib/supabase";

export default function Booking() {
  const [courts, setCourts] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLapangan();
  }, []);

  const getLapangan = async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from("lapangan")
        .select("*")
        .order("id", { ascending: true });

      if (error) {
        console.error(error);
        return;
      }

      setCourts(data || []);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const filteredCourts = courts.filter((court) =>
    court.nama.toLowerCase().includes(query.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 via-blue-50 to-white overflow-hidden">
      {/* Background Blur */}
      <div className="fixed top-0 left-0 w-[500px] h-[500px] bg-blue-500/10 blur-[180px] rounded-full pointer-events-none" />
      <div className="fixed bottom-0 right-0 w-[500px] h-[500px] bg-cyan-500/10 blur-[180px] rounded-full pointer-events-none" />

      {/* HERO */}
      <section className="relative py-24">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-blue-100 text-blue-700 font-semibold mb-6">
              🏸 SmashBooking
            </div>

            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-tight">
              Booking
              <span className="block bg-gradient-to-r from-blue-600 to-cyan-500 bg-clip-text text-transparent">
                Lapangan Badminton
              </span>
            </h1>

            <p className="mt-6 text-slate-500 max-w-2xl mx-auto text-lg">
              Pilih lapangan favoritmu dan lakukan reservasi dengan cepat,
              mudah, dan praktis langsung dari website.
            </p>

            {/* Floating Shuttlecock */}
            <div className="absolute top-20 left-10 text-6xl opacity-20 animate-bounce">
              🏸
            </div>

            <div className="absolute top-40 right-20 text-5xl opacity-20 animate-pulse">
              🏸
            </div>
          </div>
        </div>
      </section>

      {/* Statistik */}
      <section className="max-w-6xl mx-auto px-6 -mt-6 mb-16">
        <div className="grid md:grid-cols-3 gap-6">
          <div className="bg-white rounded-3xl p-8 border border-blue-100 shadow-lg hover:-translate-y-2 transition-all duration-300">
            <h3 className="text-5xl font-black text-blue-600">2</h3>
            <p className="text-slate-500 mt-2">Lapangan Indoor</p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-blue-100 shadow-lg hover:-translate-y-2 transition-all duration-300">
            <h3 className="text-5xl font-black text-blue-600">24/7</h3>
            <p className="text-slate-500 mt-2">Booking Online</p>
          </div>

          <div className="bg-white rounded-3xl p-8 border border-blue-100 shadow-lg hover:-translate-y-2 transition-all duration-300">
            <h3 className="text-5xl font-black text-blue-600">
              {courts.length}
            </h3>
            <p className="text-slate-500 mt-2">Lapangan Tersedia</p>
          </div>
        </div>
      </section>

      {/* Search */}
      <section className="max-w-4xl mx-auto px-6 mb-16">
        <div className="relative">
          <input
            type="text"
            placeholder="Cari Lapangan..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="
              w-full
              py-5
              pl-14
              pr-6
              rounded-3xl
              border
              border-blue-100
              bg-white/80
              backdrop-blur-xl
              shadow-lg
              focus:outline-none
              focus:ring-4
              focus:ring-blue-200
              text-slate-700
            "
          />

          <span className="absolute left-5 top-1/2 -translate-y-1/2 text-xl">
            🔍
          </span>
        </div>
      </section>

      {/* List Lapangan */}
      <section className="max-w-7xl mx-auto px-6 pb-24">
        {loading ? (
          <div className="flex flex-col items-center py-20">
            <div className="w-16 h-16 border-4 border-blue-200 border-t-blue-600 rounded-full animate-spin"></div>

            <p className="mt-6 text-slate-500">Memuat data lapangan...</p>
          </div>
        ) : filteredCourts.length === 0 ? (
          <div className="text-center py-20">
            <div className="text-7xl mb-4">🏸</div>

            <h2 className="text-3xl font-bold text-slate-800">
              Lapangan Tidak Ditemukan
            </h2>

            <p className="text-slate-500 mt-3">
              Coba gunakan kata kunci yang berbeda.
            </p>
          </div>
        ) : (
          <div className="grid lg:grid-cols-2 gap-10">
            {filteredCourts.map((court) => (
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
        )}
      </section>
    </div>
  );
}
