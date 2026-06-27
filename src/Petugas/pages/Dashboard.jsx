import { useState, useEffect } from "react";
import {
  FaCalendarCheck,
  FaClock,
  FaTimesCircle,
  FaUserCircle,
  FaSignOutAlt,
} from "react-icons/fa";

import PageHeader from "../components/PageHeader";
import { useNavigate } from "react-router-dom";
import bookingService from "../../services/bookingService";

export default function Dashboard() {
  const navigate = useNavigate();

  const [openProfile, setOpenProfile] = useState(false);
  const [bookings, setBookings] = useState([]);

  // ambil user login
  const user = JSON.parse(
    localStorage.getItem("user")
  );

  const [profile, setProfile] = useState({
    name: "",
    foto: "",
  });

  useEffect(() => {
    loadData();

    setProfile({
      name:
        user?.nama ||
        user?.username ||
        "Petugas",

      foto:
        user?.foto || "",
    });
  }, []);

  async function loadData() {
    try {
      const data =
        await bookingService.getBookings();

      setBookings(data || []);

    } catch (err) {
      console.log(err);
    }
  }

  // ======================
  // DATA ASLI
  // ======================

  const totalBooking =
    bookings.length;

  const pendingBooking =
    bookings.filter(
      (item) =>
        item.status === "pending"
    ).length;

  const rejectedBooking =
    bookings.filter(
      (item) =>
        item.status === "rejected"
    ).length;

  const todayBooking =
    bookings.filter(
      (item) => {

        if(!item.tanggal)
          return false;

        const today =
          new Date()
          .toISOString()
          .split("T")[0];

        return (
          item.tanggal ===
          today
        );
      }
    ).length;

  const stats = [
    {
      title: "Total Booking",
      value: totalBooking,
      icon: (
        <FaCalendarCheck size={18}/>
      ),
      color: "blue",
      path: "/petugas/booking",
    },

    {
      title:
      "Menunggu Konfirmasi",

      value:
      pendingBooking,

      icon:
      <FaClock size={18}/>,

      color:
      "orange",

      path:
      "/petugas/booking",
    },

    {
      title:
      "Booking Hari Ini",

      value:
      todayBooking,

      icon:
      <FaCalendarCheck size={18}/>,

      color:
      "green",

      path:
      "/petugas/jadwal",
    },

    {
      title:
      "Dibatalkan",

      value:
      rejectedBooking,

      icon:
      <FaTimesCircle size={18}/>,

      color:
      "red",

      path:
      "/petugas/booking",
    }
  ];

  const colorMap = {
    blue:{
      border:"border-blue-500",
      iconBg:"bg-blue-500"
    },

    orange:{
      border:"border-orange-500",
      iconBg:"bg-orange-500"
    },

    red:{
      border:"border-red-500",
      iconBg:"bg-red-500"
    },

    green:{
      border:"border-green-500",
      iconBg:"bg-green-500"
    }
  };

  const pendingList =
    bookings
    .filter(
      x =>
      x.status==="pending"
    )
    .slice(0,3);

  const today =
    new Date();

  const jadwalHariIni =
    bookings.filter(
      (item)=>{

      if(
      !item.tanggal
      )
      return false;

      const bookingDate =
      new Date(
      item.tanggal
      );

      return (
      bookingDate.toDateString() ===
      today.toDateString()
      );

  });

  return (

<div className="relative bg-gray-100 min-h-screen overflow-hidden">

{/* background blur */}

<div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-400/20 blur-3xl rounded-full"></div>

<div className="absolute top-40 right-0 w-96 h-96 bg-indigo-400/20 blur-3xl rounded-full"></div>

{/* background image */}

<div className="absolute top-0 left-0 w-full h-64 overflow-hidden">

<img
src="/img/badminton.jpg"
alt="badminton"
className="w-full h-full object-cover"
/>

<div className="absolute inset-0 bg-gradient-to-r from-blue-800/80 via-blue-600/60 to-indigo-600/80"></div>

</div>

<div className="relative z-10 p-5 md:p-10">

{/* header */}

<div className="flex justify-between items-center mb-6">

<PageHeader
title="Dashboard Overview"
breadcrumb={[
"Petugas",
"Dashboard"
]}
/>

{/* profile */}

<div className="relative">

<button
onClick={()=>
setOpenProfile(
!openProfile
)
}
className="flex items-center gap-3 bg-white px-4 py-2 rounded-xl shadow"
>

{profile.foto ? (

<img
src={profile.foto}
className="w-9 h-9 rounded-full object-cover"
/>

) : (

<div className="w-9 h-9 rounded-full bg-blue-100 flex items-center justify-center">

<FaUserCircle
size={30}
className="text-blue-500"
/>

</div>

)}

<div>

<p className="font-semibold">

{profile.name}

</p>

<p className="text-xs text-gray-500">

Petugas

</p>

</div>

</button>

{openProfile && (

<div className="absolute right-0 mt-2 w-52 bg-white rounded-xl shadow">

<button
onClick={()=>{
navigate(
"/petugas/profile"
);

setOpenProfile(false);
}}
className="w-full p-3 text-left hover:bg-gray-100"
>

<div className="flex gap-2 items-center">

<FaUserCircle/>

Edit Profile

</div>

</button>

<button
onClick={()=>{

localStorage.removeItem(
"token"
);

localStorage.removeItem(
"user"
);

navigate(
"/login"
);

}}
className="w-full p-3 text-left text-red-500 hover:bg-red-100"
>

<div className="flex gap-2 items-center">

<FaSignOutAlt/>

Logout

</div>

</button>

</div>

)}

</div>

</div>

{/* statistik */}

<div className="grid sm:grid-cols-2 md:grid-cols-4 gap-5 mt-8">

{stats.map((item,index)=>{

const c=
colorMap[item.color];

return(

<div
key={index}
onClick={()=>
navigate(
item.path
)
}
className={`bg-white rounded-2xl p-6 shadow-md border-l-4 ${c.border}
cursor-pointer hover:scale-105 transition`}
>

<div className="flex justify-between">

<div>

<p className="text-xs text-gray-400">

{item.title}

</p>

<h3 className="text-3xl font-bold mt-2">

{item.value}

</h3>

</div>

<div className={`w-11 h-11 rounded-xl flex items-center justify-center text-white ${c.iconBg}`}>

{item.icon}

</div>

</div>

</div>

);

})}

</div>

{/* booking pending + status lapangan */}

<div className="grid lg:grid-cols-2 gap-6 mt-8">

<div className="bg-white rounded-2xl shadow-md p-6">

<h3 className="font-bold text-xl mb-5">

Booking Menunggu Konfirmasi

</h3>

<div className="space-y-4">

{pendingList.length>0 ? (

pendingList.map((item)=>(

<div
key={item.id}
className="flex justify-between border-b pb-3"
>

<div>

<p className="font-semibold">

{item.users?.nama || "-"}

</p>

<p className="text-sm text-gray-500">

{item.lapangan?.nama || "-"} • {item.jam_mulai} - {item.jam_selesai}

</p>

</div>

<span className="bg-yellow-100 text-yellow-600 px-3 py-1 rounded-full text-sm">

Menunggu

</span>

</div>

))

):(

<p>Tidak ada booking</p>

)}

</div>

</div>

<div className="bg-white rounded-2xl shadow-md p-6">

<h3 className="font-bold text-xl mb-5">

Status Lapangan

</h3>

<div className="space-y-4">

{jadwalHariIni.length>0 ? (

jadwalHariIni.map((item)=>(

<div
key={item.id}
className="flex justify-between"
>

<span>

{item.lapangan?.nama || "-"}

</span>

<span className="text-red-500 font-semibold">

Dipakai

</span>

</div>

))

):(

<p>Tidak ada lapangan dipakai</p>

)}

</div>

</div>

</div>

{/* jadwal */}

<div className="bg-white rounded-2xl shadow-md p-6 mt-8">

<h3 className="font-bold text-xl mb-5">

Jadwal Hari Ini

</h3>

<table className="w-full">

<thead>

<tr className="border-b">

<th className="text-left py-3">

Lapangan

</th>

<th className="text-left py-3">

Jam

</th>

<th className="text-left py-3">

Pelanggan

</th>

</tr>

</thead>

<tbody>

{jadwalHariIni.length>0 ? (

jadwalHariIni.map((item)=>(

<tr
key={item.id}
className="border-b"
>

<td className="py-3">

{item.lapangan?.nama || "-"}

</td>

<td>

{item.jam_mulai} - {item.jam_selesai}

</td>

<td>

{item.users?.nama || "-"}

</td>

</tr>

))

):(

<tr>

<td
colSpan="3"
className="text-center py-5 text-gray-500"
>

Belum ada jadwal hari ini

</td>

</tr>

)}

</tbody>

</table>

</div>

</div>

</div>

);
}