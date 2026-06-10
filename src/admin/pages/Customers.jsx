import PageHeader from "../components/PageHeader";
import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { BsFillExclamationDiamondFill } from "react-icons/bs";

export default function Customers() {
  const breadcrumb = ["Dashboard", "Booking Lapangan", "Data Booking"];

  const [customers, setCustomers] = useState([]);
  const [error, setError] = useState(null);
  const [query, setQuery] = useState("");

  useEffect(() => {
    const timeout = setTimeout(() => {
      axios
        .get(`https://dummyjson.com/users/search?q=${query}`)
        .then((response) => {
          if (response.status !== 200) {
            setError("Gagal mengambil data");
            return;
          }

          setCustomers(response.data.users);
          setError(null);
        })
        .catch((err) => {
          setError(err.message);
        });
    }, 500);

    return () => clearTimeout(timeout);
  }, [query]);

  const errorInfo = error ? (
    <div className="bg-red-200 mb-5 p-5 text-sm rounded-xl flex items-center">
      <BsFillExclamationDiamondFill className="text-red-600 me-2" />
      {error}
    </div>
  ) : null;

  return (
    <div>
      <PageHeader title="Data Booking Lapangan" breadcrumb={breadcrumb} />

      {errorInfo}

      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Cari booking..."
        className="mb-5 p-3 w-full bg-white rounded-xl shadow"
      />

      <table className="min-w-full divide-y divide-gray-200 overflow-hidden rounded-xl shadow">
        <thead>
          <tr className="bg-blue-600 text-white">
            <th className="px-4 py-3">#</th>
            <th className="px-4 py-3">Nama Pelanggan</th>
            <th className="px-4 py-3">Nomor Telepon</th>
            <th className="px-4 py-3">Lapangan</th>
            <th className="px-4 py-3">Aksi</th>
          </tr>
        </thead>

        <tbody className="bg-white divide-y divide-gray-100">
          {customers.map((item, index) => (
            <tr key={item.id}>
              <td className="px-4 py-3">{index + 1}</td>

              <td className="px-4 py-3">
                {item.firstName} {item.lastName}
              </td>

              <td className="px-4 py-3">{item.phone}</td>

              <td className="px-4 py-3">
                Lapangan {item.id % 2 === 0 ? "2" : "1"}
              </td>

              <td className="px-4 py-3">
                <Link
                  to={`/admin/customers/${item.id}`}
                  className="bg-blue-600 text-white px-3 py-1 rounded"
                >
                  Detail Booking
                </Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
