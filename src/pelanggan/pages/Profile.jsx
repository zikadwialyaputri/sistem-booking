export default function Profile() {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">
        Profil Saya
      </h1>

      <div className="bg-white p-6 rounded-xl shadow max-w-lg">
        <div className="mb-4">
          <label className="block mb-2">
            Nama
          </label>

          <input
            type="text"
            value="Khalifa"
            readOnly
            className="w-full border p-3 rounded-lg"
          />
        </div>

        <div className="mb-4">
          <label className="block mb-2">
            Email
          </label>

          <input
            type="email"
            value="khalifa@email.com"
            readOnly
            className="w-full border p-3 rounded-lg"
          />
        </div>

        <div>
          <label className="block mb-2">
            No HP
          </label>

          <input
            type="text"
            value="08123456789"
            readOnly
            className="w-full border p-3 rounded-lg"
          />
        </div>
      </div>
    </div>
  );
}