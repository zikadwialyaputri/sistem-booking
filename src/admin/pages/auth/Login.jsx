export default function Login() {
    return (
        <div>
            {/* Heading */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">
                    Welcome Back 👋
                </h2>


                <p className="text-gray-500 mt-2 text-sm">
                    Login untuk mengakses dashboard SmashBooking
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
                        Email Admin
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
                    <div className="flex items-center justify-between mb-2">
                        <label
                            htmlFor="password"
                            className="text-sm font-semibold text-gray-700"
                        >
                            Password
                        </label>


                        <a
                            href="/forgot"
                            className="text-sm text-blue-600 hover:text-blue-700"
                        >
                            Lupa Password?
                        </a>
                    </div>


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


                {/* Remember Me */}
                <div className="flex items-center justify-between">
                    <label className="flex items-center gap-2 text-sm text-gray-600">
                        <input
                            type="checkbox"
                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                        />
                        Remember me
                    </label>
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
                    Login Dashboard
                </button>
            </form>


            {/* Footer Text */}
            <p className="text-center text-sm text-gray-400 mt-6">
                SmashBooking Management System
            </p>
        </div>
    );
}
