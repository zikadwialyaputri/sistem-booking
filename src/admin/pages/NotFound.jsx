import { Link } from "react-router-dom";

export default function NotFound() {
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#f4f6fb] px-6">
            
            <div className="text-center max-w-xl">
                
                {/* 404 */}
                <div className="relative inline-block">
                    <h1 className="text-[120px] md:text-[160px] font-extrabold text-blue-600 leading-none">
                        404
                    </h1>

                    <div className="
                        absolute top-6 right-[-20px]
                        bg-blue-600 text-white
                        text-xs font-semibold
                        px-4 py-2 rounded-full
                        shadow-lg rotate-12
                    ">
                        Page Not Found
                    </div>
                </div>

                {/* Title */}
                <h2 className="mt-8 text-3xl md:text-4xl font-bold text-gray-800">
                    Oops! Halaman Tidak Ditemukan
                </h2>

                {/* Description */}
                <p className="mt-4 text-gray-500 leading-relaxed">
                    Halaman yang kamu cari tidak tersedia di sistem
                    <span className="font-semibold text-blue-600">
                        {" "}SmashBooking
                    </span>.
                    Mungkin halaman sudah dipindahkan atau URL yang dimasukkan salah.
                </p>

                {/* Action Buttons */}
                <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
                    
                    <Link
                        to="/"
                        className="
                            px-8 py-3 rounded-xl
                            bg-blue-600 hover:bg-blue-700
                            text-white font-semibold
                            shadow-md hover:shadow-lg
                            transition duration-300
                        "
                    >
                        Kembali ke Dashboard
                    </Link>

                    <Link
                        to="/login"
                        className="
                            px-8 py-3 rounded-xl
                            border border-gray-300
                            bg-white hover:bg-gray-100
                            text-gray-700 font-semibold
                            transition duration-300
                        "
                    >
                        Halaman Login
                    </Link>
                </div>

                {/* Footer */}
                <p className="mt-10 text-sm text-gray-400">
                    SmashBooking Management System © 2026
                </p>
            </div>
        </div>
    );
}