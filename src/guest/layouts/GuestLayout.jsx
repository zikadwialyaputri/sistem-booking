import { Outlet } from "react-router-dom";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

export default function GuestLayout() {
  return (
    <div className="bg-[#f5f7fb] min-h-screen">

      <Navbar />

      <main>
        <Outlet />
      </main>

      <Footer />

    </div>
  );
}