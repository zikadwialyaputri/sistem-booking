import { Routes, Route, Navigate } from "react-router-dom";

import Sidebar from "./layouts/Sidebar";
import Header from "./layouts/Header";

import Dashboard from "./pages/Dashboard";
import Orders from "./pages/Orders";
import Customers from "./pages/Customers";
import StatusLapangan from "./pages/StatusLapangan";
import Laporan from "./pages/Reports";
import Statistik from "./pages/Statistik";

export default function App() {
  return (
    <div className="flex min-h-screen bg-gray-100">

      <Sidebar />

      <div className="flex flex-col flex-1">
        <Header />
        <main className="flex-1 p-4 md:p-6 overflow-auto">

          <Routes>
            <Route path="/" element={<Navigate to="/admin/dashboard" replace />} />

            <Route path="/admin/dashboard" element={<Dashboard />} />
            <Route path="/admin/orders" element={<Orders />} />
            <Route path="/admin/customers" element={<Customers />} />
            <Route path="/admin/status-lapangan" element={<StatusLapangan />} />
            <Route path="/admin/reports" element={<Laporan />} />
            <Route path="/admin/statistik" element={<Statistik />} />

            <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />

          </Routes>

        </main>
      </div>
    </div>
  );
}