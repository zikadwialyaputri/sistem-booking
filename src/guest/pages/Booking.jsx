import { useNavigate } from "react-router-dom";

export default function Booking() {
  const navigate = useNavigate();

  // function cek login
  const handleBooking = () => {
    const token = localStorage.getItem("token");

    // kalau belum login
    if (!token) {
      navigate("/login");
      return;
    }

    // kalau sudah login
    alert("Booking berhasil!");
  };

  const courts = [
    {
      id: 1,
      name: "Lapangan Indoor A",
      price: "Rp50.000 / jam",
      image:
        "https://images.unsplash.com/photo-1626224583764-f87db24ac4ea?q=80&w=1400",
    },
    {
      id: 2,
      name: "Lapangan Premium B",
      price: "Rp75.000 / jam",
      image:
        "https://images.unsplash.com/photo-1612872087720-bb876e2e67d1?q=80&w=1400",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f5f7fb]">
      {/* Hero Section */}
      <section className="relative overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <img
            src="https://images.unsplash.com/photo-1546519638-68e109498ffc?q=80&w=1600"
            alt="Badminton"
            className="w-full h-full object-cover"
          />

          {/* Overlay */}
          <div className="absolute inset-0 bg-black/60"></div>
        </div>

        {/* Content */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 py-36">
          <p className="text-blue-400 font-semibold uppercase tracking-[0.3em] mb-5">
            Booking Court
          </p>

          <h1 className="text-5xl md:text-6xl font-bold text-white leading-tight mb-6">
            Pilih Lapangan <br />
            Badminton Favoritmu
          </h1>

          <p className="text-gray-200 text-lg max-w-2xl leading-relaxed">
            Booking lapangan badminton dengan mudah, cepat, dan nyaman hanya
            dalam beberapa klik.
          </p>
        </div>
      </section>

      {/* Court List */}
      <section className="max-w-7xl mx-auto px-6 py-24">
        {/* Section Title */}
        <div className="text-center mb-16">
          <p className="text-blue-600 font-semibold uppercase tracking-widest mb-4">
            Available Courts
          </p>

          <h2 className="text-5xl font-bold text-gray-900 mb-5">
            Lapangan Tersedia
          </h2>

          <p className="text-gray-500 max-w-2xl mx-auto leading-relaxed">
            Pilih lapangan badminton terbaik dengan fasilitas premium dan
            pengalaman bermain yang nyaman.
          </p>
        </div>

        {/* Cards */}
        <div className="grid lg:grid-cols-2 gap-10">
          {courts.map((court) => (
            <div
              key={court.id}
              className="group bg-white rounded-[35px] overflow-hidden shadow-sm hover:shadow-2xl transition-all duration-500"
            >
              {/* Image */}
              <div className="overflow-hidden relative">
                <img
                  src={court.image}
                  alt={court.name}
                  className="h-[350px] w-full object-cover group-hover:scale-105 transition-all duration-700"
                />

                {/* Badge */}
                <div className="absolute top-6 left-6 bg-blue-600 text-white px-5 py-2 rounded-full text-sm font-semibold shadow-lg">
                  Available
                </div>
              </div>

              {/* Content */}
              <div className="p-8">
                {/* Top */}
                <div className="flex items-center justify-between mb-5">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {court.name}
                  </h2>

                  <span className="text-blue-600 font-semibold text-lg">
                    {court.price}
                  </span>
                </div>

                {/* Desc */}
                <p className="text-gray-500 leading-relaxed mb-8">
                  Lapangan badminton indoor dengan fasilitas premium,
                  pencahayaan modern, lantai berkualitas, dan suasana bermain
                  yang nyaman.
                </p>

                {/* Booking Form */}
                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <input
                    type="date"
                    className="border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all"
                  />

                  <select className="border border-gray-200 rounded-2xl px-5 py-4 outline-none focus:border-blue-500 focus:ring-4 focus:ring-blue-100 transition-all">
                    <option>Pilih Jam</option>
                    <option>08:00</option>
                    <option>10:00</option>
                    <option>12:00</option>
                    <option>14:00</option>
                    <option>16:00</option>
                  </select>
                </div>

                {/* Button */}
                <button
                  onClick={handleBooking}
                  className="w-full bg-blue-600 hover:bg-blue-700 hover:shadow-xl text-white py-4 rounded-2xl font-semibold transition-all duration-300"
                >
                  Booking Sekarang
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}