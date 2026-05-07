

import { Outlet } from "react-router-dom";

export default function AuthLayout() {
    return (
        <div className="min-h-screen flex bg-[#f4f6fb]">
           
            {/* Left Side */}
            <div className="hidden lg:flex w-1/2 bg-gradient-to-br from-blue-700 via-blue-600 to-indigo-700 text-white relative overflow-hidden">
               
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/10"></div>


                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center px-16">
                    <h1 className="text-5xl font-extrabold mb-4">
                        SmashBooking
                    </h1>


                    <p className="text-xl text-blue-100 mb-6">
                        Sistem Manajemen Booking Lapangan Badminton
                    </p>


                    <div className="space-y-4 text-blue-50">
                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-white"></div>
                            <p>Kelola booking dengan mudah</p>
                        </div>


                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-white"></div>
                            <p>Pantau status lapangan secara realtime</p>
                        </div>


                        <div className="flex items-center gap-3">
                            <div className="w-3 h-3 rounded-full bg-white"></div>
                            <p>Laporan dan statistik booking lengkap</p>
                        </div>
                    </div>
                </div>


                {/* Decorative Circle */}
                <div className="absolute -bottom-24 -right-24 w-72 h-72 bg-white/10 rounded-full"></div>
                <div className="absolute top-10 right-10 w-32 h-32 bg-white/10 rounded-full"></div>
            </div>


            {/* Right Side */}
            <div className="flex flex-1 items-center justify-center p-6">
                <div className="w-full max-w-md bg-white rounded-3xl shadow-xl p-8">
                   
                    {/* Logo */}
                    <div className="text-center mb-8">
                        <h1 className="text-4xl font-extrabold text-blue-600">
                            SmashBooking
                        </h1>


                        <p className="text-gray-500 mt-2">
                            Admin Dashboard Login
                        </p>
                    </div>


                    {/* Form */}
                    <Outlet />


                    {/* Footer */}
                    <p className="text-center text-sm text-gray-400 mt-8">
                        © 2026 SmashBooking. All rights reserved.
                    </p>
                </div>
            </div>
        </div>
    );
}

