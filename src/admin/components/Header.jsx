import { useEffect, useState } from "react";
import { supabase } from "../../services/supabase";

export default function Header() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    getUser();
  }, []);

  const getUser = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    setUser(user);
  };

  return (
    <nav className="sticky top-0 z-50 w-full bg-white/20 backdrop-blur-xl border-b border-white/30 shadow-sm">
      
      <div className="flex items-center justify-between px-6 md:px-10 py-3">

        {/* LOGO */}
        <div className="flex items-center gap-2">
          <div className="w-2.5 h-2.5 rounded-full bg-blue-500"></div>
          <h1 className="font-bold text-lg text-gray-800 tracking-wide">
            SmashBooking
          </h1>
        </div>

        {/* PROFILE */}
        <div className="relative">
          <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-blue-500 shadow-md hover:scale-105 transition">
            <img
              src="/img/pp.jpg"
              alt="profile"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

      </div>
    </nav>
  );
}