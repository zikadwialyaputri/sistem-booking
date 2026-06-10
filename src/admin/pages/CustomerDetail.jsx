import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function CustomerDetail() {
  const { id } = useParams();

  const [customer, setCustomer] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get(`https://dummyjson.com/users/${id}`)
      .then((response) => {
        if (response.status !== 200) {
          setError("Data booking tidak ditemukan");
          return;
        }

        setCustomer(response.data);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, [id]);

  if (error) {
    return <div className="text-red-600 p-4">{error}</div>;
  }

  if (!customer) {
    return <div className="p-4">Loading...</div>;
  }

  // Mapping data user menjadi data booking
  const lapangan = customer.id % 2 === 0 ? "Lapangan 2" : "Lapangan 1";

  const tanggalBooking = `2025-06-${String((customer.id % 20) + 1).padStart(
    2,
    "0",
  )}`;

  const jamBooking = ["15:00", "16:00", "17:00", "18:00", "19:00", "20:00"][
    customer.id % 6
  ];

  return (
    <div className="bg-white p-6 rounded-xl shadow-lg max-w-xl mx-auto">
      <h1 className="text-2xl font-bold mb-6">Detail Booking</h1>

      <img
        src={customer.image}
        alt={customer.firstName}
        className="w-32 h-32 rounded-full mx-auto mb-6"
      />

      <div className="space-y-3 text-gray-700">
        <p>
          <strong>Nama Pelanggan :</strong> {customer.firstName}{" "}
          {customer.lastName}
        </p>

        <p>
          <strong>Nomor Telepon :</strong> {customer.phone}
        </p>

        <p>
          <strong>Lapangan :</strong> {lapangan}
        </p>

        <p>
          <strong>Tanggal Booking :</strong> {tanggalBooking}
        </p>

        <p>
          <strong>Jam Bermain :</strong> {jamBooking}
        </p>
      </div>
    </div>
  );
}
