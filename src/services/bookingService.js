import { supabase } from "./supabase";

const bookingService = {

  async getBookings() {

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
      .order("created_at", {
        ascending: false
      });

    if (error) {
      console.log(error);
      return [];
    }

    return data;
  },

  async updateStatus(id, status) {

    const { error } = await supabase
      .from("bookings")
      .update({
        status
      })
      .eq("id", id);

    if (error) throw error;
  }

};

export default bookingService;