import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-50 px-6">

      <div className="text-center">

        <h1 className="text-7xl font-bold text-blue-600 mb-4">
          404
        </h1>

        <p className="text-gray-500 mb-8">
          Halaman tidak ditemukan.
        </p>

        <Link
          to="/"
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl transition-all"
        >
          Kembali ke Home
        </Link>

      </div>

    </div>
  );
}