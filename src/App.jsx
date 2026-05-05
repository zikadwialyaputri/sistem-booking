import Sidebar from "./admin/layouts/Sidebar";
import Header from "./admin/layouts/Header";
import { Routes, Route } from "react-router-dom";

import Orders from "./admin/pages/Orders.jsx";
import Dashboard from "./admin/pages/Dashboard.jsx";
import Customers from "./admin/pages/Customers.jsx";
import StatusLapangan from "./admin/pages/StatusLapangan.jsx";
import Laporan from "./admin/pages/Laporan.jsx";
import Statistik from "./admin/pages/Statistik.jsx";
export default function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex">
      <Sidebar />

      <div className="flex-1">
        <Header />

        <div className="p-6 mt-16">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/orders" element={<Orders />} />
            <Route path="/customers" element={<Customers />} />
            <Route path="/lapangan" element={<StatusLapangan />} />
            <Route path="/laporan" element={<Laporan />} />
            <Route path="/statistik" element={<Statistik />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}