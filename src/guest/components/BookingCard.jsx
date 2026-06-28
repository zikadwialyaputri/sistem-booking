import { Link } from "react-router-dom";

export default function BookingCard({ id, image, title, price, description }) {
  return (
    <div className="group relative overflow-hidden rounded-[32px] border border-blue-100 bg-white shadow-lg transition-all duration-500 hover:-translate-y-3 hover:shadow-[0_25px_50px_rgba(37,99,235,0.25)]">
      {/* Glow Effect */}
      <div className="absolute -top-32 -right-32 h-64 w-64 rounded-full bg-blue-400/20 blur-3xl opacity-0 transition-all duration-700 group-hover:opacity-100"></div>

      {/* IMAGE */}
      <div className="relative overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-[320px] w-full object-cover transition-all duration-700 group-hover:scale-110"
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-blue-950/80 via-blue-900/10 to-transparent"></div>

        {/* Badge */}
        <div className="absolute top-5 left-5 rounded-full bg-blue-600 px-4 py-2 text-sm font-semibold text-white shadow-lg">
          Tersedia
        </div>

        {/* Floating Price */}
        <div className="absolute bottom-5 right-5 rounded-2xl bg-white/95 backdrop-blur-md px-5 py-3 shadow-xl">
          <h4 className="font-bold text-blue-600">
            Rp {price.toLocaleString("id-ID")}
          </h4>
        </div>
      </div>

      {/* CONTENT */}
      <div className="p-7">
        {/* Judul */}
        <h3 className="mb-3 text-2xl font-bold text-slate-800">{title}</h3>

        {/* Deskripsi */}
        <p className="mb-6 text-slate-500 leading-relaxed">{description}</p>

        {/* Info */}
        <div className="mb-7 flex items-center justify-between rounded-2xl bg-blue-50 p-4">
          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400">
              Operasional
            </p>

            <h4 className="mt-1 font-semibold text-slate-800">
              16.00 - 21.00 WIB
            </h4>
          </div>

          <div className="h-10 w-px bg-blue-200"></div>

          <div>
            <p className="text-xs uppercase tracking-widest text-slate-400">
              Status
            </p>

            <h4 className="mt-1 font-semibold text-green-600">Siap Booking</h4>
          </div>
        </div>

        {/* Button */}
        <Link
          to={`/lapangan/${id}`}
          className="flex items-center justify-center gap-3 rounded-2xl bg-gradient-to-r from-blue-600 to-blue-700 py-4 font-semibold text-white transition-all duration-300 hover:scale-[1.02] hover:shadow-xl hover:shadow-blue-300/50"
        >
          Lihat Detail
          <span className="transition-transform duration-300 group-hover:translate-x-1">
            →
          </span>
        </Link>
      </div>
    </div>
  );
}
