export default function Forgot() {
    return (
        <div>
            {/* Heading */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">
                    Lupa Password?
                </h2>

                <p className="text-gray-500 mt-2 text-sm leading-relaxed">
                    Masukkan email akun kamu untuk menerima
                    link reset password SmashBooking.
                </p>
            </div>

            {/* Form */}
            <form className="space-y-5">

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

                {/* Button */}
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
                    Kirim Link Reset Password
                </button>
            </form>

            {/* Back Login */}
            <div className="text-center mt-6">
                <a
                    href="/login"
                    className="text-sm text-blue-600 hover:text-blue-700 font-medium"
                >
                    ← Kembali ke Login
                </a>
            </div>

            {/* Footer */}
            <p className="text-center text-sm text-gray-400 mt-6">
                SmashBooking - Sistem Booking Lapangan Badminton
            </p>
        </div>
    );
}