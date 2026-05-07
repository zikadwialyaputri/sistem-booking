import React, { Suspense } from "react";
import { Routes, Route } from "react-router-dom";

// Components
import Loading from "./components/Loading";

// Layouts
import MainLayout from "./layouts/MainLayout";
import AuthLayout from "./layouts/AuthLayout";

// Lazy Pages
const Dashboard = React.lazy(() => import("./pages/Dashboard"));
const Orders = React.lazy(() => import("./pages/Orders"));
const Customers = React.lazy(() => import("./pages/Customers"));
const NotFound = React.lazy(() => import("./pages/NotFound"));

const Login = React.lazy(() => import("./pages/auth/Login"));
const Register = React.lazy(() => import("./pages/auth/Register"));
const Forgot = React.lazy(() => import("./pages/auth/Forgot"));

export default function App() {
    return (
        <Suspense fallback={<Loading />}>
            <Routes>

                {/* Main Layout */}
                <Route element={<MainLayout />}>
                    <Route path="/" element={<Dashboard />} />
                    <Route path="/orders" element={<Orders />} />
                    <Route path="/customers" element={<Customers />} />
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