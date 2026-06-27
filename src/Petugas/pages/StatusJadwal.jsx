import { useState, useEffect } from "react";
import PageHeader from "../components/PageHeader";
import bookingService from "../../services/bookingService";

export default function StatusJadwal() {

  const [search, setSearch] = useState("");
  const [jadwal, setJadwal] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadJadwal();
  }, []);

  async function loadJadwal() {

    try {

      setLoading(true);

      const data =
        await bookingService.getBookings();

      setJadwal(data || []);

    } catch(err){

      console.log(err);

    } finally {

      setLoading(false);

    }
  }

  const getStatusStyle = (status) => {

    switch (status) {

      case "approved":
        return "bg-green-100 text-green-700";

      case "pending":
        return "bg-yellow-100 text-yellow-700";

      case "rejected":
        return "bg-red-100 text-red-700";

      case "done":
        return "bg-blue-100 text-blue-700";

      default:
        return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusText = (status) => {

    switch(status){

      case "approved":
        return "Dikonfirmasi";

      case "pending":
        return "Menunggu";

      case "rejected":
        return "Ditolak";

      case "done":
        return "Selesai";

      default:
        return status;
    }
  };

  // search multi field
  const filteredJadwal =
    jadwal.filter((item)=>

      `${item.lapangan?.nama}
      ${item.tanggal}
      ${item.jam_mulai}
      ${item.jam_selesai}
      ${item.status}`

      .toLowerCase()
      .includes(search.toLowerCase())
    );

  return (

    <div className="relative bg-gray-100 min-h-screen overflow-hidden">

      {/* BACKGROUND */}
      <div className="absolute -top-20 -left-20 w-96 h-96 bg-blue-400/20 blur-3xl rounded-full"></div>

      <div className="absolute top-40 right-0 w-96 h-96 bg-indigo-400/20 blur-3xl rounded-full"></div>

      {/* HEADER */}
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden">

        <img
          src="/img/badminton.jpg"
          className="w-full h-full object-cover"
          alt=""
        />

        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/80 via-blue-600/60 to-indigo-600/80"></div>

      </div>

      <div className="relative z-10 p-5 md:p-10">

        <PageHeader
          title="Status Jadwal Lapangan"
          breadcrumb={[
            "Petugas",
            "Jadwal"
          ]}
        />

        {/* SEARCH */}
        <div className="mt-6">

          <input
            type="text"
            placeholder="Cari lapangan, tanggal, jam.."
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

          <h2 className="text-lg font-bold mb-5">
            Daftar Jadwal
          </h2>

          {loading ? (

            <div className="text-center py-10">

              Memuat data...

            </div>

          ) : (

          <div className="overflow-x-auto">

            <table className="w-full text-left">

              <thead>

                <tr className="border-b text-gray-600">

                  <th className="p-3">
                    Lapangan
                  </th>

                  <th className="p-3">
                    Tanggal
                  </th>

                  <th className="p-3">
                    Jam
                  </th>

                  <th className="p-3">
                    Status
                  </th>

                </tr>

              </thead>

              <tbody>

                {filteredJadwal.length > 0 ? (

                  filteredJadwal.map((item)=>(

                    <tr
                      key={item.id}
                      className="border-b hover:bg-gray-50"
                    >

                      <td className="p-3 font-medium">

                        {item.lapangan?.nama || "-"}

                      </td>

                      <td className="p-3 text-gray-600">

                        {item.tanggal
                        ? new Date(
                          item.tanggal
                        ).toLocaleDateString(
                          "id-ID",
                          {
                            day:"2-digit",
                            month:"long",
                            year:"numeric"
                          }
                        )
                        : "-"}

                      </td>

                      <td className="p-3 text-gray-600">

                        {item.jam_mulai}
                        -
                        {item.jam_selesai}

                      </td>

                      <td className="p-3">

                        <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(item.status)}`}
                        >

                          {getStatusText(
                            item.status
                          )}

                        </span>

                      </td>

                    </tr>

                  ))

                ) : (

                <tr>

                  <td
                  colSpan="4"
                  className="text-center p-6 text-gray-400"
                  >

                    Data tidak ditemukan

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