import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaCalendarCheck,
  FaCheckCircle,
  FaClock,
} from "react-icons/fa";

import { supabase } from "../../services/supabase";

export default function BookingSaya() {

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [lapanganData, setLapanganData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getLapangan();
  }, []);

  async function getLapangan() {

    try {

      setLoading(true);

      const { data, error } =
        await supabase
        .from("lapangan")
        .select("*");

      if(error){
        console.log(error);
        return;
      }

      setLapanganData(data || []);

    } catch(err){

      console.log(err);

    } finally {

      setLoading(false);

    }
  }

  const filtered =
    lapanganData.filter((item)=>

      item.nama
      ?.toLowerCase()
      .includes(
        search.toLowerCase()
      )

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
          alt=""
          className="w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-blue-800/80 via-blue-600/60 to-indigo-600/80"></div>

      </div>

      <div className="relative z-10 p-5 md:p-10">

        {/* JUDUL */}
        <div className="text-white mb-10">

          <h1 className="text-4xl font-bold">
            Booking Lapangan
          </h1>

          <p className="text-blue-100 mt-2">
            Pilih lapangan yang ingin dipesan
          </p>

        </div>

        {/* STATISTIK */}
        <div className="grid md:grid-cols-3 gap-4 mb-8">

          <div className="bg-white rounded-xl shadow-md p-5">

            <FaCalendarCheck className="text-blue-500 text-2xl mb-2"/>

            <p className="text-gray-500 text-sm">

              Total Lapangan

            </p>

            <h2 className="text-3xl font-bold text-blue-600">

              {lapanganData.length}

            </h2>

          </div>

          <div className="bg-white rounded-xl shadow-md p-5">

            <FaCheckCircle className="text-green-500 text-2xl mb-2"/>

            <p className="text-gray-500 text-sm">

              Tersedia

            </p>

            <h2 className="text-3xl font-bold text-green-600">

              {lapanganData.length}

            </h2>

          </div>

          <div className="bg-white rounded-xl shadow-md p-5">

            <FaClock className="text-orange-500 text-2xl mb-2"/>

            <p className="text-gray-500 text-sm">

              Jam Operasional

            </p>

            <h2 className="text-xl font-bold text-orange-500">

              15:00 - 21:00

            </h2>

          </div>

        </div>

        {/* SEARCH */}
        <div className="mb-6">

          <input
            type="text"
            placeholder="Cari lapangan..."
            value={search}
            onChange={(e)=>
              setSearch(
                e.target.value
              )
            }
            className="w-full md:w-96 px-4 py-3 rounded-xl shadow-md border bg-white"
          />

        </div>

        {/* DAFTAR */}
        <div className="bg-white rounded-3xl shadow-md p-6">

          <h2 className="text-xl font-bold text-blue-600 mb-6">

            Daftar Lapangan

          </h2>

          {loading ? (

            <div className="text-center py-10">

              Memuat data...

            </div>

          ) : (

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">

            {filtered.length > 0 ? (

              filtered.map((court)=>(

                <div
                  key={court.id}
                  className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-2xl hover:-translate-y-2 transition"
                >

                  {/* GAMBAR */}
                  <div className="relative h-56">

                    <img
                      src={
                        court.gambar ||
                        "/img/default-court.jpg"
                      }
                      alt={court.nama}
                      className="w-full h-full object-cover"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent"></div>

                    <div className="absolute top-4 right-4 bg-white/90 px-3 py-1 rounded-full">

                      <p className="text-sm font-bold text-green-600">

                        Rp {Number(
                          court.harga || 0
                        ).toLocaleString("id-ID")}

                      </p>

                    </div>

                    <div className="absolute bottom-4 left-4 text-white">

                      <h2 className="font-bold text-2xl">

                        {court.nama}

                      </h2>

                      <p className="text-sm">

                        {court.ukuran || "-"}

                      </p>

                    </div>

                  </div>

                  {/* CONTENT */}
                  <div className="p-5">

                    <div className="flex justify-between mb-5">

                      <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">

                        Tersedia

                      </span>

                      <span className="text-gray-500 text-sm">

                        / jam

                      </span>

                    </div>

                    <button
                      onClick={()=>
                        navigate(
                          `/pelanggan/booking/${court.id}`
                        )
                      }
                      className="w-full py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white"
                    >

                      Booking Sekarang

                    </button>

                  </div>

                </div>

              ))

            ) : (

              <div className="col-span-3 text-center py-10 text-gray-500">

                Data lapangan tidak ditemukan

              </div>

            )}

          </div>

          )}

        </div>

      </div>

    </div>
  );
}