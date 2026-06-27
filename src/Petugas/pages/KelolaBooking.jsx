import { useEffect, useState } from "react";
import PageHeader from "../components/PageHeader";
import {
  FaCheck,
  FaTimes,
} from "react-icons/fa";

import bookingService from "../../services/bookingService";

export default function Orders() {

  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {

    loadBooking();

    // refresh otomatis tiap 1 menit
    const interval = setInterval(() => {
      loadBooking();
    }, 60000);

    return () => clearInterval(interval);

  }, []);

  async function loadBooking() {

    try {

      setLoading(true);

      let data =
        await bookingService.getBookings();

      const now = new Date();

      // ======================
      // AUTO DONE
      // ======================

      for (const item of data) {

        if (
          item.status === "approved" &&
          item.tanggal &&
          item.jam_selesai
        ) {

          const bookingSelesai =
            new Date(
              `${item.tanggal}T${item.jam_selesai}`
            );

          // jika waktu sekarang sudah lewat
          if (now >= bookingSelesai) {

            await bookingService.updateStatus(
              item.id,
              "done"
            );

            item.status = "done";
          }
        }
      }

      // ambil data terbaru lagi
      data =
        await bookingService.getBookings();

      setBookings(data || []);

    } catch (err) {

      console.log(err);

    } finally {

      setLoading(false);

    }
  }

  async function updateStatus(
    id,
    status
  ) {

    try {

      await bookingService.updateStatus(
        id,
        status
      );

      loadBooking();

    } catch (error) {

      console.log(error);

      alert(
        "Gagal update status"
      );
    }
  }

  const filtered =
    bookings.filter(
      (item) =>
        item.users?.nama
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          ) || !search
    );

  const pending =
    filtered.filter(
      (x) =>
        x.status === "pending"
    );

  const approved =
    filtered.filter(
      (x) =>
        x.status === "approved"
    );

  const rejected =
    filtered.filter(
      (x) =>
        x.status === "rejected"
    );

  const done =
    filtered.filter(
      (x) =>
        x.status === "done"
    );

  const getStatusColor = (
    status
  ) => {

    switch(status){

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "approved":
        return "bg-green-100 text-green-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      case "done":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  return (

    <div className="relative bg-gray-100 min-h-screen overflow-hidden">

      {/* Background */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-400/20 blur-3xl rounded-full"></div>

      <div className="absolute top-40 right-0 w-96 h-96 bg-indigo-400/20 blur-3xl rounded-full"></div>

      {/* Header */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden">

        <img
          src="/img/badminton.jpg"
          alt=""
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/80 via-blue-600/60 to-indigo-600/80"></div>

      </div>

      <div className="relative z-10 p-5 md:p-10">

        <PageHeader
          title="Kelola Booking"
          breadcrumb={[
            "Admin",
            "Kelola Booking"
          ]}
        />

        {/* CARD */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">

          <div className="bg-white rounded-2xl shadow-md p-5">

            <p className="text-gray-500 text-sm">
              Menunggu
            </p>

            <h2 className="text-3xl font-bold text-orange-500">
              {pending.length}
            </h2>

          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">

            <p className="text-gray-500 text-sm">
              Disetujui
            </p>

            <h2 className="text-3xl font-bold text-green-500">
              {approved.length}
            </h2>

          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">

            <p className="text-gray-500 text-sm">
              Ditolak
            </p>

            <h2 className="text-3xl font-bold text-red-500">
              {rejected.length}
            </h2>

          </div>

          <div className="bg-white rounded-2xl shadow-md p-5">

            <p className="text-gray-500 text-sm">
              Selesai
            </p>

            <h2 className="text-3xl font-bold text-blue-500">
              {done.length}
            </h2>

          </div>

        </div>

        {/* SEARCH */}
        <div className="mt-6">

          <input
            type="text"
            placeholder="Cari pelanggan..."
            value={search}
            onChange={(e)=>
              setSearch(
                e.target.value
              )
            }
            className="w-full md:w-96 px-4 py-3 rounded-xl shadow-md border bg-white"
          />

        </div>

        {/* TABLE */}
        <div className="bg-white rounded-2xl shadow-md p-6 mt-6">

          <h2 className="font-bold text-lg mb-5">

            Daftar Booking

          </h2>

          {loading ? (

            <div className="text-center py-10">

              Memuat data...

            </div>

          ) : (

          <div className="overflow-x-auto">

            <table className="w-full">

              <thead>

                <tr className="border-b">

                  <th className="p-3 text-left">
                    Pelanggan
                  </th>

                  <th className="p-3 text-left">
                    Lapangan
                  </th>

                  <th className="p-3 text-left">
                    Tanggal
                  </th>

                  <th className="p-3 text-left">
                    Jam
                  </th>

                  <th className="p-3 text-left">
                    Total
                  </th>

                  <th className="p-3 text-left">
                    Status
                  </th>

                  <th className="p-3 text-left">
                    Aksi
                  </th>

                </tr>

              </thead>

              <tbody>

                {filtered.length > 0 ? (

                  filtered.map((item)=>(

                  <tr
                    key={item.id}
                    className="border-b hover:bg-gray-50"
                  >

                    <td className="p-3">
                      {item.users?.nama || "-"}
                    </td>

                    <td className="p-3">
                      {item.lapangan?.nama || "-"}
                    </td>

                    <td className="p-3">
                      {new Date(
                        item.tanggal
                      ).toLocaleDateString(
                        "id-ID"
                      )}
                    </td>

                    <td className="p-3">
                      {item.jam_mulai} -
                      {item.jam_selesai}
                    </td>

                    <td className="p-3 text-green-600 font-semibold">
                      Rp {Number(
                        item.total || 0
                      ).toLocaleString("id-ID")}
                    </td>

                    <td className="p-3">

                      <span
                      className={`px-3 py-1 rounded-full text-xs ${getStatusColor(item.status)}`}
                      >
                        {item.status}
                      </span>

                    </td>

                    <td className="p-3 flex gap-2">

                      {item.status==="pending" && (
                        <>
                          <button
                          onClick={()=>updateStatus(
                            item.id,
                            "approved"
                          )}
                          className="bg-green-500 text-white p-2 rounded-lg"
                          >
                            <FaCheck/>
                          </button>

                          <button
                          onClick={()=>updateStatus(
                            item.id,
                            "rejected"
                          )}
                          className="bg-red-500 text-white p-2 rounded-lg"
                          >
                            <FaTimes/>
                          </button>
                        </>
                      )}

                      {item.status==="approved" && (
                        <span className="text-blue-600 text-sm">
                          Menunggu selesai otomatis
                        </span>
                      )}

                      {item.status==="done" && (
                        <span className="text-green-600 text-sm">
                          Booking selesai
                        </span>
                      )}

                    </td>

                  </tr>

                  ))

                ) : (

                <tr>

                  <td
                    colSpan="7"
                    className="text-center p-6 text-gray-500"
                  >
                    Data booking tidak ditemukan
                  </td>

                </tr>

                )}

              </tbody>

            </table>

          </div>

          )}

        </div>

      </div>

    </div>
  );
}