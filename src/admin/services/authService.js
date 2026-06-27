import { supabase } from "../../lib/supabase";

/**
 * REGISTER USER
 */
export const registerUser = async ({
  nama,
  username,
  phone,
  email,
  password,
}) => {
  // 1. Daftar ke Supabase Auth
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
  });

  if (error) throw error;

  // 2. Simpan data tambahan ke tabel profiles
  const { error: profileError } = await supabase.from("profiles").insert({
    id: data.user.id,
    nama,
    username,
    phone,
    email,
    role: "pelanggan",
  });

  if (profileError) throw profileError;

  return data;
};

/**
 * LOGIN USER
 */
export const loginUser = async (email, password) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });

  if (error) throw error;

  return data;
};

/**
 * LOGOUT
 */
export const logoutUser = async () => {
  await supabase.auth.signOut();
};

/**
 * USER LOGIN
 */
export const getCurrentUser = async () => {
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return user;
};

/**
 * PROFILE USER
 */
export const getProfile = async (id) => {
  const { data, error } = await supabase
    .from("profiles")
    .select("*")
    .eq("id", id)
    .single();

  if (error) throw error;

  return data;
};