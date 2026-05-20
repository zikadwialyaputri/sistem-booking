import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

import Loading from "./admin/components/Loading";

// Layouts
import MainLayout from "./admin/layouts/MainLayout";
import AuthLayout from "./admin/layouts/AuthLayout";
import GuestLayout from "./guest/layouts/GuestLayout";

// Petugas
import PetugasLayout from "./petugas/layouts/PetugasLayout";
import KelolaBooking from "./petugas/pages/KelolaBooking";
import PetugasDashboard from "./petugas/pages/Dashboard";
import PageHeader from "../components/PageHeader";

// Admin Pages
const AdminDashboard = React.lazy(() => import("./admin/pages/Dashboard"));

const Orders = React.lazy(() => import("./admin/pages/Orders"));

const Customers = React.lazy(() => import("./admin/pages/Customers"));

const Reports = React.lazy(() => import("./admin/pages/Reports"));

const Statistik = React.lazy(() => import("./admin/pages/Statistik"));

const StatusLapangan = React.lazy(() => import("./admin/pages/StatusLapangan"));

const NotFound = React.lazy(() => import("./admin/pages/NotFound"));

// Auth
const Login = React.lazy(() => import("./admin/pages/auth/Login"));

const Register = React.lazy(() => import("./admin/pages/auth/Register"));

const Forgot = React.lazy(() => import("./admin/pages/auth/Forgot"));

// Guest Pages
const Home = React.lazy(() => import("./guest/pages/Home"));

const Booking = React.lazy(() => import("./guest/pages/Booking"));

const About = React.lazy(() => import("./guest/pages/About"));

const DetailLapangan = React.lazy(() => import("./guest/pages/DetailLapangan"));

export default function App() {
  return (
    <Suspense fallback={<Loading />}>
      <Routes>
        {/* Guest */}
        <Route element={<GuestLayout />}>
          <Route path="/" element={<Home />} />
          <Route path="/booking" element={<Booking />} />
          <Route path="/lapangan/:id" element={<DetailLapangan />} />
          <Route path="/about" element={<About />} />
        </Route>

        {/* Admin */}
        <Route path="/admin" element={<MainLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="orders" element={<Orders />} />
          <Route path="customers" element={<Customers />} />
          <Route path="reports" element={<Reports />} />
          <Route path="statistik" element={<Statistik />} />
          <Route path="status-lapangan" element={<StatusLapangan />} />
        </Route>

        {/* Petugas */}
        <Route path="/petugas" element={<PetugasLayout />}>
          {/* default page → dashboard */}
          <Route index element={<PetugasDashboard />} />

          <Route path="booking" element={<KelolaBooking />} />
          <Route path="dashboard" element={<PetugasDashboard />} />
        </Route>

        {/* Auth */}
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot" element={<Forgot />} />
        </Route>

        {/* 404 */}
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Suspense>
  );
}
