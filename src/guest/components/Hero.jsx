import { Link } from "react-router-dom";

export default function Hero() {
  return (
    <section
      className="relative h-screen bg-cover bg-center"
      style={{
        backgroundImage:
          "url('https://images.unsplash.com/photo-1556817411-31ae72fa3ea0?q=80&w=1600')",
      }}
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60"></div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 h-full flex items-center">

        <div className="max-w-3xl">

          <p className="text-blue-400 uppercase tracking-[0.4em] mb-6">
            SmashBooking
          </p>

          <h1 className="text-6xl md:text-7xl font-bold text-white leading-tight mb-8">
            Booking Lapangan <br />
            Badminton Modern
          </h1>

          <p className="text-gray-200 text-lg leading-relaxed mb-10">
            Nikmati pengalaman booking lapangan badminton yang cepat,
            mudah, dan nyaman dengan fasilitas premium.
          </p>

          {/* Button */}
          <div className="flex items-center gap-5">

            <Link
              to="/booking"
              className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-semibold transition-all shadow-xl shadow-blue-900/30"
            >
              Booking Sekarang
            </Link>

          </div>

        </div>

      </div>
    </section>
  );
}