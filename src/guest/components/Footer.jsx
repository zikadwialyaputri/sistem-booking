export default function Footer() {
  return (
    <footer
      id="footer"
      className="relative overflow-hidden bg-[#0f1720] text-white pt-28"
    >
      {/* Pattern Background */}
      <div className="absolute inset-0 opacity-10">
        <div className="grid grid-cols-6 h-full">
          {Array.from({ length: 24 }).map((_, index) => (
            <div
              key={index}
              className="border border-white/10"
            ></div>
          ))}
        </div>
      </div>

      {/* Blur Effect */}
      <div className="absolute top-0 left-0 w-72 h-72 bg-blue-500 opacity-20 blur-3xl rounded-full"></div>

      <div className="absolute bottom-0 right-0 w-80 h-80 bg-cyan-400 opacity-10 blur-3xl rounded-full"></div>

      <div className="max-w-7xl mx-auto px-6 relative z-10">

        {/* Top Footer */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-16 pb-20">

          {/* Brand */}
          <div className="max-w-sm">

            <h2 className="text-5xl font-black text-blue-400 leading-tight">
              SmashBooking
            </h2>

            <p className="text-gray-300 leading-relaxed mt-6 text-[15px]">
              Platform booking lapangan badminton modern
              dengan sistem cepat, mudah, dan nyaman
              untuk semua pemain badminton.
            </p>

            {/* Badge */}
            <div className="mt-8 inline-flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-full backdrop-blur-lg">

              <span className="w-3 h-3 bg-blue-400 rounded-full"></span>

              <span className="text-sm text-gray-200">
                Premium Court Booking
              </span>

            </div>

          </div>

          {/* Navigation */}
          <div>

            <h3 className="text-2xl font-bold mb-8">
              Navigation
            </h3>

            <ul className="space-y-4 text-gray-300 text-[15px]">

              <li className="hover:text-blue-400 transition cursor-pointer">
                Home
              </li>

              <li className="hover:text-blue-400 transition cursor-pointer">
                Booking
              </li>

              <li className="hover:text-blue-400 transition cursor-pointer">
                About
              </li>

              <li className="hover:text-blue-400 transition cursor-pointer">
                Courts
              </li>

              <li className="hover:text-blue-400 transition cursor-pointer">
                Contact
              </li>

            </ul>

          </div>

          {/* Contact */}
          <div>

            <h3 className="text-2xl font-bold mb-8">
              Contact
            </h3>

            <ul className="space-y-4 text-gray-300 text-[15px] leading-relaxed">

              <li className="hover:text-blue-400 transition">
                support@smashbooking.com
              </li>

              <li className="hover:text-blue-400 transition">
                +62 812 3456 7890
              </li>

              <li className="hover:text-blue-400 transition">
                Pekanbaru, Indonesia
              </li>

            </ul>

          </div>

          {/* Social */}
          <div>

            <h3 className="text-2xl font-bold mb-8">
              Social Media
            </h3>

            <div className="flex flex-wrap gap-4">

              <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-full hover:bg-blue-500 hover:border-blue-500 transition cursor-pointer text-sm">
                Instagram
              </div>

              <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-full hover:bg-blue-500 hover:border-blue-500 transition cursor-pointer text-sm">
                Facebook
              </div>

              <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-full hover:bg-blue-500 hover:border-blue-500 transition cursor-pointer text-sm">
                Twitter
              </div>

              <div className="bg-white/5 border border-white/10 px-5 py-3 rounded-full hover:bg-blue-500 hover:border-blue-500 transition cursor-pointer text-sm">
                TikTok
              </div>

            </div>

            {/* Partners */}
            <div className="mt-10">

              <h4 className="text-lg font-semibold text-white mb-5">
                Partners
              </h4>

              <div className="flex flex-wrap gap-3">

                <span className="text-sm text-gray-300 bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:bg-blue-500 hover:border-blue-500 hover:text-white transition cursor-pointer">
                  Yonex
                </span>

                <span className="text-sm text-gray-300 bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:bg-blue-500 hover:border-blue-500 hover:text-white transition cursor-pointer">
                  Li-Ning
                </span>

                <span className="text-sm text-gray-300 bg-white/5 px-4 py-2 rounded-full border border-white/10 hover:bg-blue-500 hover:border-blue-500 hover:text-white transition cursor-pointer">
                  Victor
                </span>

              </div>

            </div>

          </div>

        </div>

        {/* Bottom */}
        <div className="border-t border-white/10 py-8 flex flex-col md:flex-row items-center justify-between gap-5">

          <p className="text-gray-400 text-sm text-center md:text-left">
            © 2026 SmashBooking. All rights reserved.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">

            <span className="hover:text-blue-400 transition cursor-pointer">
              Privacy Policy
            </span>

            <span className="hover:text-blue-400 transition cursor-pointer">
              Terms & Conditions
            </span>

            <span className="hover:text-blue-400 transition cursor-pointer">
              Support
            </span>

          </div>

        </div>

      </div>
    </footer>
  );
}