import { Outlet } from "react-router-dom";
import Sidebar from "../components/Sidebar";

export default function PelangganLayout() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      {/* SIDEBAR */}
      <Sidebar />

      {/* MAIN CONTENT */}
      <main className="flex-1 p-6 overflow-y-auto">

        <div className="bg-white rounded-2xl shadow-sm min-h-full p-6">
          <Outlet />
        </div>

      </main>

    </div>
  );
}