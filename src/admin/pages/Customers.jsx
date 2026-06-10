import PageHeader from "../components/PageHeader";

export default function Customers() {

  const customers = [
    {
      name: "Andi Pratama",
      email: "andi@gmail.com",
      status: "Aktif",
      join: "2025-01-10",
    },
    {
      name: "Budi Santoso",
      email: "budi@gmail.com",
      status: "Nonaktif",
      join: "2025-02-12",
    },
    {
      name: "Citra Lestari",
      email: "citra@gmail.com",
      status: "Aktif",
      join: "2025-03-01",
    },
    {
      name: "Dewi Anggraini",
      email: "dewi@gmail.com",
      status: "Aktif",
      join: "2025-03-15",
    },
  ];

  const statusColor = (status) => {
    if (status === "Aktif") return "bg-green-100 text-green-600 border-green-500";
    return "bg-red-100 text-red-600 border-red-500";
  };

  return (
    <div className="relative bg-gray-100 min-h-screen">

      
      <div className="absolute top-0 left-0 w-full h-64 overflow-hidden">
        <img
          src="/img/badminton.jpg"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-blue-700/80 via-blue-500/60 to-indigo-600/80"></div>
      </div>

      {/* CONTENT */}
      <div className="relative z-10 p-5 md:p-10">

        <PageHeader
          title="Data Customers"
          breadcrumb={["Admin", "Customers"]}
        />

        {/* GRID CARDS */}
        <div className="mt-8 grid md:grid-cols-2 gap-6">

          {customers.map((c, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-xl p-6 border-l-4 hover:scale-105 transition"
            >

              {/* HEADER CARD */}
              <div className="flex justify-between items-center mb-4">

                <div className="flex items-center gap-3">

                  {/* AVATAR */}
                  <div className="w-10 h-10 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">
                    {c.name.charAt(0)}
                  </div>

                  <h2 className="text-lg font-bold text-gray-800">
                    {c.name}
                  </h2>

                </div>

                {/* STATUS */}
                <span
                  className={`px-3 py-1 rounded-full text-xs font-bold border ${statusColor(
                    c.status
                  )}`}
                >
                  {c.status}
                </span>

              </div>

              {/* DETAIL */}
              <div className="text-gray-500 text-sm space-y-2">
                <p>
                  <span className="font-semibold">Email:</span> {c.email}
                </p>
                <p>
                  <span className="font-semibold">Bergabung:</span> {c.join}
                </p>
              </div>

            </div>
          ))}

        </div>

      </div>
    </div>
  );
}