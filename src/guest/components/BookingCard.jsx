export default function BookingCard({ image, title, price }) {
  return (
    <div className="group bg-white rounded-[35px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500">
      {/* Image */}
      <div className="overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-[350px] w-full object-cover group-hover:scale-105 transition-all duration-700"
        />
      </div>

      {/* Content */}
      <div className="p-8">
        <div className="flex items-center justify-between mb-5">
          <h3 className="text-2xl font-bold text-gray-900">{title}</h3>

          <span className="text-blue-600 font-semibold">{price}</span>
        </div>

        <p className="text-gray-500 leading-relaxed mb-8">
          Lapangan badminton indoor dengan pencahayaan premium, lantai
          berkualitas, dan suasana nyaman.
        </p>

        <button className="w-full bg-black hover:bg-blue-600 text-white py-4 rounded-2xl transition-all">
          Booking Sekarang
        </button>
      </div>
    </div>
  );
}
