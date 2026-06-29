import { supabase } from "./supabase";

const bookingService = {
  async getBookings() {
    try {
      const { data, error } = await supabase
        .from("bookings")
        .select(`
          *,
          users (
            id,
            nama
          ),
          lapangan (
            id,
            nama,
            harga
          )
        `)
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error mengambil data booking:", error);
        return [];
      }

      // Menghapus data yang memiliki ID sama
      const uniqueData = Array.from(
        new Map((data || []).map((item) => [item.id, item])).values()
      );

      return uniqueData;
    } catch (err) {
      console.error(err);
      return [];
    }
  },

  async updateStatus(id, status) {
    try {
      const { error } = await supabase
        .from("bookings")
        .update({ status })
        .eq("id", id);

      if (error) throw error;
    } catch (err) {
      console.error(err);
      throw err;
    }
  },
};

export default bookingService;