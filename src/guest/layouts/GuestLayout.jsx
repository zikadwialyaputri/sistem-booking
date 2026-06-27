import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Outlet } from "react-router-dom";

export default function GuestLayout() {
  return (
    <div className="min-h-screen flex flex-col bg-[#f5f7fb]">

      {/* Navbar */}
      <Navbar />

      {/* Isi halaman */}
      <main className="flex-1">
        <Outlet />
      </main>

      {/* Footer */}
      <Footer />

    </div>
  );
}