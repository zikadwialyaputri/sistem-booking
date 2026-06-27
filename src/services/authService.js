import { supabase } from "./supabase";

const authService = {

  async login(email, password) {
    const { data, error } =
      await supabase.auth.signInWithPassword({
        email,
        password,
      });

    if (error) throw error;

    return data;
  },

  async register(email, password) {
    const { data, error } =
      await supabase.auth.signUp({
        email,
        password,
      });

    if (error) throw error;

    return data;
  },

  async logout() {
    await supabase.auth.signOut();
  },
};

export default authService;