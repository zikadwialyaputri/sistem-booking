import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Loading from "./components/Loading";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// Pages
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const Reports = React.lazy(() => import("./pages/Reports"));
const Statistik = React.lazy(() => import("./pages/Statistik"));
const StatusLapangan = React.lazy(() => import("./pages/StatusLapangan"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

// Auth Pages
const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

export default function App() {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>

                {/* Admin Layout */}
                <Route path="/admin" element={<MainLayout />}>

                    {/* Dashboard */}
                    <Route index element={<Dashboard />} />

                    {/* Pages */}
                    <Route path="orders" element={<Orders />} />
                    <Route path="customers" element={<Customers />} />
                    <Route path="reports" element={<Reports />} />
                    <Route path="statistik" element={<Statistik />} />
                    <Route path="status-lapangan" element={<StatusLapangan />} />

                </Route>

                {/* Auth Layout */}
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