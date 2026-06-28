import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import Loading from "../components/Loading";
import { supabase } from "../../lib/supabase";

export default function DetailLapangan() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [court, setCourt] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {
    getDetail();
  }, [id]);

  const getDetail = async () => {
    try {
      const { data, error } = await supabase
        .from("lapangan")
        .select("*")
        .eq("id", Number(id))
        .single();

      if (error) {
        setError("Lapangan tidak ditemukan");
        return;
      }

      setCourt(data);
    } catch (err) {
      setError("Terjadi kesalahan");
    }
  };

  const handleBooking = () => {
    navigate("/login");
  };

  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <h1 className="text-2xl font-bold text-red-500">{error}</h1>
      </div>
    );
  }

  if (!court) {
    return <Loading />;
  }

  return (
    <section className="bg-gradient-to-b from-blue-50 via-white to-blue-50 py-20">
      <div className="mx-auto max-w-6xl px-6">
        {/* CARD */}
        <div className="overflow-hidden rounded-[36px] bg-white shadow-[0_20px_60px_rgba(37,99,235,0.15)]">
          {/* IMAGE */}
          <div className="relative">
            <img
              src={court.gambar}
              alt={court.nama}
              className="h-[500px] w-full object-cover"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-blue-950/90 via-transparent to-transparent"></div>

            <div className="absolute bottom-10 left-10">
              <span className="mb-4 inline-flex rounded-full bg-blue-600 px-5 py-2 text-sm font-semibold text-white shadow-lg">
                Lapangan Premium
              </span>

              <h1 className="mt-4 text-5xl font-bold text-white">
                {court.nama}
              </h1>
            </div>
          </div>

          {/* CONTENT */}
          <div className="p-10">
            {/* INFO GRID */}
            <div className="grid gap-5 md:grid-cols-4">
              <div className="rounded-3xl bg-blue-50 p-6">
                <p className="text-sm text-gray-500">Harga</p>

                <h3 className="mt-2 text-2xl font-bold text-blue-600">
                  Rp {Number(court.harga).toLocaleString("id-ID")}
                </h3>

                <span className="text-sm text-gray-500">/ Jam</span>
              </div>

              <div className="rounded-3xl bg-blue-50 p-6">
                <p className="text-sm text-gray-500">Ukuran</p>

                <h3 className="mt-2 text-xl font-bold text-slate-800">
                  {court.ukuran}
                </h3>
              </div>

              <div className="rounded-3xl bg-blue-50 p-6">
                <p className="text-sm text-gray-500">Kapasitas</p>

                <h3 className="mt-2 text-xl font-bold text-slate-800">
                  {court.kapasitas}
                </h3>
              </div>

              <div className="rounded-3xl bg-blue-50 p-6">
                <p className="text-sm text-gray-500">Operasional</p>

                <h3 className="mt-2 text-xl font-bold text-slate-800">
                  {court.jam_operasional}
                </h3>
              </div>
            </div>

            {/* FASILITAS */}
            <div className="mt-12">
              <h2 className="mb-6 text-3xl font-bold text-slate-800">
                Fasilitas Lapangan
              </h2>

              {court.fasilitas && court.fasilitas.length > 0 ? (
                <div className="grid gap-4 md:grid-cols-2">
                  {court.fasilitas.map((item, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 rounded-2xl border border-blue-100 bg-white p-4 shadow-sm"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-blue-600 text-white">
                        ✓
                      </div>

                      <span className="font-medium text-slate-700">{item}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500">Belum ada data fasilitas.</p>
              )}
            </div>

            {/* CTA */}
            <div className="mt-12">
              <button
                onClick={handleBooking}
                className="w-full rounded-3xl bg-gradient-to-r from-blue-600 to-blue-700 py-5 text-lg font-bold text-white transition-all duration-300 hover:scale-[1.01] hover:shadow-xl hover:shadow-blue-300/50"
              >
                Booking Sekarang
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
