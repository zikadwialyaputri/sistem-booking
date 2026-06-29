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

  // Mengembalikan null agar komponen ini tidak merender elemen visual apa pun (bersih)
  return null;
}