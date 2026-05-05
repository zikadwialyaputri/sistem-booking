import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./admin/layouts/Sidebar";
import Header from "./admin/layouts/Header";

import Orders from "./admin/pages/Orders";
import Dashboard from "./admin/pages/Dashboard";
import StatusLapangan from "./admin/pages/StatusLapangan";
import Laporan from "./admin/pages/Laporan";
import Statistik from "./admin/pages/Statistik";

export default function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <div className="p-6 mt-16">
          <Routes>
            {/* Redirect / → /admin */}
            <Route path="/" element={<Navigate to="/admin" />} />

            {/* ADMIN ROUTES */}
            <Route path="/admin">
              <Route index element={<Dashboard />} />
              <Route path="bookings" element={<Orders />} />
              <Route path="lapangan" element={<StatusLapangan />} />
              <Route path="laporan" element={<Laporan />} />
              <Route path="statistik" element={<Statistik />} />
            </Route>

            {/* NOT FOUND */}
            <Route path="*" element={<h1>404 Not Found</h1>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}