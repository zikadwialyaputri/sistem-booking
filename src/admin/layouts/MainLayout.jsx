import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
    return (
        <div className="min-h-screen bg-[#f4f6fb] flex">

            {/* Sidebar */}
            <Sidebar />

            {/* Main Content */}
            <div className="flex-1 flex flex-col overflow-hidden">

                {/* Header */}
                <div className="px-6 pt-5">
                    <Header />
                </div>

                {/* Page Content */}
                <main className="flex-1 p-6 overflow-y-auto">
                    <div className="bg-white rounded-3xl shadow-sm min-h-full p-6">
                        <Outlet />
                    </div>
                </main>
            </div>
        </div>
    );
}