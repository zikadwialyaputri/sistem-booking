import { Link, Outlet, useLocation, useNavigate } from "react-router-dom";
import { 
  FaLayout, 
  FaCalendarPlus, 
  FaHistory, 
  FaUserAlt, 
  FaSignOutAlt,
  FaQrcode
} from "react-icons/fa";

export default function PelangganLayout() {
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuItems = [
    {
      name: "Dashboard",
      path: "/pelanggan",
      icon: <FaLayout className="text-lg" />,
    },
    {
      name: "Booking",
      icon: <FaCalendarPlus className="text-lg" />,
      children: [
        {
          name: "Booking Lapangan",
          path: "/pelanggan/booking",
        },
        {
          name: "Riwayat Booking",
          path: "/pelanggan/riwayat",
        },
      ],
    },
    {
      name: "Profil Saya",
      path: "/pelanggan/profile",
      icon: <FaUserAlt className="text-lg" />,
    },
  ];

  // auto open dropdown kalau sedang di halaman booking/riwayat
  const isBookingActive =
    location.pathname.includes("/pelanggan/booking") ||
    location.pathname.includes("/pelanggan/riwayat");

  return (
    <div className="flex min-h-screen bg-gray-50">

      {/* SIDEBAR */}
      <aside className="w-64 bg-white border-r border-gray-200 flex flex-col fixed h-full z-20">

        {/* Logo */}
        <div className="p-6 border-b border-gray-100 flex items-center gap-3">
          <div className="p-2 bg-blue-600 rounded-xl text-white">
            <FaQrcode className="text-xl" />
          </div>
          <div>
            <h1 className="font-bold text-gray-800 text-lg leading-none">
              SmashBooking
            </h1>
            <span className="text-xs text-gray-400">Pelanggan Portal</span>
          </div>
        </div>

        {/* MENU */}
        <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">

          {menuItems.map((item, index) => {

            // 🔹 Dropdown Booking
            if (item.children) {
              return (
                <div key={index}>

                  {/* Parent */}
                  <div className="
                    flex items-center gap-3 px-4 py-3 rounded-xl
                    text-gray-600 font-medium text-sm
                  ">
                    {item.icon}
                    {item.name}
                  </div>

                  {/* Children */}
                  <div className={`ml-6 mt-1 space-y-1 ${isBookingActive ? "block" : "hidden"}`}>

                    {item.children.map((child, i) => {
                      const isActive = location.pathname === child.path;

                      return (
                        <Link
                          key={i}
                          to={child.path}
                          className={`
                            block px-4 py-2 rounded-lg text-sm transition
                            ${
                              isActive
                                ? "bg-blue-50 text-blue-600"
                                : "text-gray-500 hover:bg-gray-50"
                            }
                          `}
                        >
                          {child.name}
                        </Link>
                      );
                    })}

                  </div>
                </div>
              );
            }

            // 🔹 Menu normal
            const isActive = location.pathname === item.path;

            return (
              <Link
                key={index}
                to={item.path}
                className={`
                  flex items-center gap-3 px-4 py-3 rounded-xl font-medium text-sm transition
                  ${
                    isActive
                      ? "bg-blue-50 text-blue-600 shadow-sm"
                      : "text-gray-500 hover:bg-gray-50 hover:text-gray-800"
                  }
                `}
              >
                {item.icon}
                {item.name}
              </Link>
            );
          })}
        </nav>

        {/* LOGOUT */}
        <div className="p-4 border-t border-gray-100">
          <button
            onClick={handleLogout}
            className="flex w-full items-center gap-3 px-4 py-3 text-red-500 font-medium text-sm rounded-xl hover:bg-red-50"
          >
            <FaSignOutAlt className="text-lg" />
            Keluar Aplikasi
          </button>
        </div>

      </aside>

      {/* MAIN */}
      <div className="flex-1 pl-64">

        {/* TOP BAR */}
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-end px-8 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-blue-600 font-semibold text-sm">
              K
            </div>
            <span className="text-sm font-semibold text-gray-700">
              Khalifa
            </span>
          </div>
        </header>

        {/* CONTENT */}
        <main className="p-6 max-w-7xl mx-auto">
          <Outlet />
        </main>

      </div>
    </div>
  );
}