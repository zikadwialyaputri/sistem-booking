import { Link } from "react-router-dom";

export default function BookingCard({
  id,
  image,
  title,
  price,
  description,
}) {
  return (
    <div className="group bg-white rounded-[35px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
      <div className="overflow-hidden relative">
        <img
          src={image}
          alt={title}
          className="h-[350px] w-full object-cover group-hover:scale-105 transition-all duration-700"
        />

        <div className="absolute top-6 left-6 bg-green-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg">
          Tersedia
        </div>
      </div>

      <div className="p-8">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-2xl font-bold text-gray-900">
            {title}
          </h3>

          <span className="text-blue-600 font-semibold">
            Rp {(price || 0).toLocaleString("id-ID")} / jam
          </span>
        </div>

        <p className="text-gray-500 leading-relaxed mb-8">
          {description}
        </p>

        <Link
          to={`/guest/lapangan/${id}`}
          className="inline-block bg-blue-600 text-white px-6 py-3 rounded-xl hover:bg-blue-700 transition"
        >
          Lihat Detail
        </Link>
      </div>
    </div>
  );
}