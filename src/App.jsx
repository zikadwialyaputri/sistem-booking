<<<<<<< HEAD
// import Sidebar from "./admin/layouts/Sidebar";
// import Header from "./admin/layouts/Header";
// import { Routes, Route } from "react-router-dom";

<<<<<<< HEAD
// import Orders from "./admin/pages/Orders.jsx";
// import Dashboard from "./admin/pages/Dashboard.jsx";
// import Customers from "./admin/pages/Customers.jsx";
// import StatusLapangan from "./admin/pages/StatusLapangan.jsx";
// import Laporan from "./admin/pages/Reports.jsx";
// import Statistik from "./admin/pages/Statistik.jsx";
// export default function App() {
//   return (
//     <div className="bg-gray-100 min-h-screen flex">
//       <Sidebar />
=======
import Orders from "./admin/pages/Orders.jsx";
import Dashboard from "./admin/pages/Dashboard.jsx";
import StatusLapangan from "./admin/pages/StatusLapangan.jsx";
import Laporan from "./admin/pages/Laporan.jsx";
import Statistik from "./admin/pages/Statistik.jsx";
=======
import { Routes, Route, Navigate } from "react-router-dom";
import Sidebar from "./admin/layouts/Sidebar";
import Header from "./admin/layouts/Header";

import Orders from "./admin/pages/Orders";
import Dashboard from "./admin/pages/Dashboard";
import StatusLapangan from "./admin/pages/StatusLapangan";
import Laporan from "./admin/pages/Laporan";
import Statistik from "./admin/pages/Statistik";

>>>>>>> e3b00a9a6abd8dcd48ca9b13a99a413c1ee41b69
export default function App() {
  return (
    <div className="bg-gray-100 min-h-screen flex">
      <Sidebar />
>>>>>>> e118cc1325f716bf76a645d8a905818a91b6ae07

//       <div className="flex-1">
//         <Header />

<<<<<<< HEAD
//         <div className="p-6 mt-16">
//           <Routes>
//             <Route path="/" element={<Dashboard />} />
//             <Route path="/orders" element={<Orders />} />
//             <Route path="/customers" element={<Customers />} />
//             <Route path="/lapangan" element={<StatusLapangan />} />
//             <Route path="/laporan" element={<Laporan />} />
//             <Route path="/statistik" element={<Statistik />} />
//           </Routes>
//         </div>
//       </div>
//     </div>
//   );
// }
=======
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
>>>>>>> e118cc1325f716bf76a645d8a905818a91b6ae07
