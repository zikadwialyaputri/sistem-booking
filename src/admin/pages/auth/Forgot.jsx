import { useState } from "react";
import { supabase } from "../../../services/supabase";
import { BsFillExclamationDiamondFill } from "react-icons/bs";
import { ImSpinner2 } from "react-icons/im";
import { Link } from "react-router-dom";

export default function Forgot() {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");

    const handleReset = async (e) => {
        e.preventDefault();

        if (!email) {
            setError("Email wajib diisi");
            return;
        }

        setLoading(true);
        setMessage("");
        setError("");

        const { error } = await supabase.auth.resetPasswordForEmail(
            email,
            {
                redirectTo: "http://localhost:5173/reset-password",
            }
        );

        if (error) {
            setError(error.message);
        } else {
            setMessage(
                "Link reset password berhasil dikirim. Silakan cek email kamu."
            );
            setEmail("");
        }

        setLoading(false);
    };

    return (
        <div>

            {/* HEADER */}
            <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-800">
                    Lupa Password?
                </h2>

                <p className="text-gray-500 mt-2 text-sm">
                    Masukkan email untuk reset password akun kamu
                </p>
            </div>

            {/* ERROR */}
            {error && (
                <div className="bg-red-100 border border-red-200 mb-5 p-4 text-sm text-red-600 rounded-xl flex items-center">
                    <BsFillExclamationDiamondFill className="mr-2 text-lg" />
                    {error}
                </div>
            )}

            {/* SUCCESS */}
            {message && (
                <div className="bg-green-100 border border-green-200 mb-5 p-4 text-sm text-green-700 rounded-xl">
                    {message}
                </div>
            )}

            {/* FORM */}
            <form onSubmit={handleReset} className="space-y-5">

                {/* EMAIL */}
                <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                        Email
                    </label>

                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Masukkan email"
                        disabled={loading}
                        className="
                            w-full px-4 py-3
                            border border-gray-300
                            rounded-xl
                            bg-gray-50
                            focus:outline-none
                            focus:ring-2
                            focus:ring-blue-500
                        "
                    />
                </div>

                {/* BUTTON */}
                <button
                    type="submit"
                    disabled={loading}
                    className="
                        w-full py-3
                        rounded-xl
                        bg-blue-600 hover:bg-blue-700
                        text-white font-semibold
                        disabled:opacity-50
                    "
                >
                    {loading ? (
                        <span className="flex items-center justify-center">
                            <ImSpinner2 className="animate-spin mr-2" />
                            Mengirim...
                        </span>
                    ) : (
                        "Kirim Link Reset Password"
                    )}
                </button>
            </form>

            {/* BACK LOGIN */}
            <div className="text-center mt-6">
                <Link
                    to="/login"
                    className="text-sm text-blue-600 font-semibold hover:underline"
                >
                    ← Kembali ke Login
                </Link>
            </div>

            {/* FOOTER */}
            <div className="text-center mt-8 text-gray-400 text-xs">
                © 2026 SmashBooking. All rights reserved.
            </div>

        </div>
    );
}