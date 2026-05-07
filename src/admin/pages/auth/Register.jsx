export default function Register() {
    return (
        <div>
            {/* Heading */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">
                    Buat Akun Baru ✨
                </h2>

                <p className="text-gray-500 mt-2 text-sm">
                    Daftar untuk mulai booking lapangan badminton dengan mudah
                </p>
            </div>

            {/* Form */}
            <form className="space-y-5">

                {/* Full Name */}
                <div>
                    <label
                        htmlFor="name"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        Nama Lengkap
                    </label>

                    <input
                        type="text"
                        id="name"
                        placeholder="Masukkan nama lengkap"
                        className="
                            w-full px-4 py-3
                            border border-gray-300
                            rounded-xl
                            bg-gray-50
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            focus:border-blue-500
                            transition
                        "
                    />
                </div>

                {/* Phone */}
                <div>
                    <label
                        htmlFor="phone"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        Nomor Telepon
                    </label>

                    <input
                        type="text"
                        id="phone"
                        placeholder="Masukkan nomor telepon"
                        className="
                            w-full px-4 py-3
                            border border-gray-300
                            rounded-xl
                            bg-gray-50
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            focus:border-blue-500
                            transition
                        "
                    />
                </div>

                {/* Email */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        Email
                    </label>

                    <input
                        type="email"
                        id="email"
                        placeholder="Masukkan email anda"
                        className="
                            w-full px-4 py-3
                            border border-gray-300
                            rounded-xl
                            bg-gray-50
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            focus:border-blue-500
                            transition
                        "
                    />
                </div>

                {/* Password */}
                <div>
                    <label
                        htmlFor="password"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        Password
                    </label>

                    <input
                        type="password"
                        id="password"
                        placeholder="Masukkan password"
                        className="
                            w-full px-4 py-3
                            border border-gray-300
                            rounded-xl
                            bg-gray-50
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            focus:border-blue-500
                            transition
                        "
                    />
                </div>

                {/* Confirm Password */}
                <div>
                    <label
                        htmlFor="confirmPassword"
                        className="block text-sm font-semibold text-gray-700 mb-2"
                    >
                        Konfirmasi Password
                    </label>

                    <input
                        type="password"
                        id="confirmPassword"
                        placeholder="Ulangi password"
                        className="
                            w-full px-4 py-3
                            border border-gray-300
                            rounded-xl
                            bg-gray-50
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                            focus:border-blue-500
                            transition
                        "
                    />
                </div>

                {/* Terms */}
                <div className="flex items-start gap-2">
                    <input
                        type="checkbox"
                        className="mt-1 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                    />

                    <p className="text-sm text-gray-600">
                        Saya setuju dengan syarat dan ketentuan SmashBooking
                    </p>
                </div>

                {/* Register Button */}
                <button
                    type="submit"
                    className="
                        w-full py-3 rounded-xl
                        bg-blue-600 hover:bg-blue-700
                        text-white font-semibold
                        transition duration-300
                        shadow-md hover:shadow-lg
                    "
                >
                    Daftar Sekarang
                </button>
            </form>

            {/* Login Link */}
            <div className="text-center mt-6">
                <p className="text-sm text-gray-500">
                    Sudah punya akun?{" "}

                    <a
                        href="/login"
                        className="text-blue-600 hover:text-blue-700 font-semibold"
                    >
                        Login disini
                    </a>
                </p>
            </div>

            {/* Footer */}
            <p className="text-center text-sm text-gray-400 mt-6">
                SmashBooking - Sistem Booking Lapangan Badminton
            </p>
        </div>
    );
}