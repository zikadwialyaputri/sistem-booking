export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative overflow-hidden bg-[#0f172a] text-white pt-24"
    >
      {/* Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="grid grid-cols-8 h-full">
          {Array.from({ length: 40 }).map((_, i) => (
            <div key={i} className="border border-white/10"></div>
          ))}
        </div>
      </div>

      {/* Blur */}
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-blue-500/20 blur-3xl rounded-full"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-cyan-500/10 blur-3xl rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-6">
        {/* TOP */}
        <div className="grid lg:grid-cols-[2fr_1fr_1.2fr_1.4fr] gap-16 pb-20">
          {/* Brand */}
          <div>
            <h2 className="text-5xl font-black text-blue-400">SmashBooking</h2>

            <p className="text-gray-300 mt-6 leading-8">
              Platform booking resmi untuk
              <span className="text-white font-semibold">
                {" "}
                GOR Badminton Gabus{" "}
              </span>
              di Kota Pekanbaru. Nikmati proses booking lapangan yang cepat,
              praktis, dan dapat dilakukan kapan saja secara online.
            </p>

            <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-5 backdrop-blur-md">
              <h4 className="font-semibold text-lg mb-2">
                📍 GOR Badminton Gabus
              </h4>

              <p className="text-gray-400 text-sm leading-7">
                HC5P+GC7,
                <br />
                Jl. Kayangan Gg. Gabus,
                <br />
                Meranti Pandak, Rumbai,
                <br />
                Kota Pekanbaru,
                <br />
                Riau 28266
              </p>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <h3 className="text-2xl font-bold mb-8">Navigation</h3>

            <ul className="space-y-5">
              {[
                ["Home", "#home"],
                ["Booking", "#booking"],
                ["About", "#about"],
                ["Statistics", "#statistics"],
                ["Contact", "#footer"],
              ].map(([title, link]) => (
                <li key={title}>
                  <a
                    href={link}
                    className="group flex items-center gap-3 text-gray-300 hover:text-blue-400 transition"
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-500 group-hover:scale-150 transition"></span>
                    {title}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-2xl font-bold mb-8">Contact</h3>

            <div className="space-y-6">
              <div className="flex gap-4">
                <span className="text-xl">✉️</span>

                <div>
                  <p className="text-gray-400 text-sm">Email</p>

                  <a
                    href="mailto:smashbooking.gorgabus@gmail.com"
                    className="hover:text-blue-400 transition"
                  >
                    smashbooking.gorgabus@gmail.com
                  </a>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-xl">☎️</span>

                <div>
                  <p className="text-gray-400 text-sm">Telepon</p>

                  <p>0812-3456-xxxx</p>
                </div>
              </div>

              <div className="flex gap-4">
                <span className="text-xl">🕒</span>

                <div>
                  <p className="text-gray-400 text-sm">Jam Operasional</p>

                  <p>16.00 - 21.00 WIB</p>
                </div>
              </div>
            </div>
          </div>

          {/* Social */}
          <div>
            <h3 className="text-2xl font-bold mb-8">Follow Us</h3>

            <div className="space-y-4">
              <a
                href="#"
                className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-5 py-4 hover:bg-blue-600 hover:border-blue-600 transition"
              >
                <span>📷 Instagram</span>

                <span className="text-sm">@gorgabus</span>
              </a>

              <a
                href="#"
                className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-5 py-4 hover:bg-blue-600 hover:border-blue-600 transition"
              >
                <span>📘 Facebook</span>

                <span className="text-sm">GOR Gabus</span>
              </a>

              <a
                href="#"
                className="flex items-center justify-between bg-white/5 border border-white/10 rounded-xl px-5 py-4 hover:bg-blue-600 hover:border-blue-600 transition"
              >
                <span>🎵 TikTok</span>

                <span className="text-sm">@gorgabus</span>
              </a>
            </div>

            <div className="mt-10 bg-gradient-to-r from-blue-600 to-cyan-500 rounded-2xl p-5">
              <h4 className="font-bold text-lg">⭐ GOR Gabus</h4>

              <p className="text-sm text-blue-100 mt-2 leading-6">
                Lapangan badminton indoor dengan fasilitas lengkap, area parkir
                luas, musholla, kamar mandi, serta pencahayaan LED standar
                pertandingan.
              </p>
            </div>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row justify-between items-center gap-5">
          <p className="text-gray-400 text-sm">
            © 2026{" "}
            <span className="text-white font-semibold">SmashBooking</span>.
            Website Booking Resmi GOR Badminton Gabus Pekanbaru.
          </p>

          <div className="flex gap-8 text-sm">
            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition"
            >
              Privacy Policy
            </a>

            <a
              href="#"
              className="text-gray-400 hover:text-blue-400 transition"
            >
              Terms
            </a>

            <a
              href="#footer"
              className="text-gray-400 hover:text-blue-400 transition"
            >
              Support
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
