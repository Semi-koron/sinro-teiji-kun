import { supabase } from "./supabase";

type UserData = {
  id: string;
  name: string;
  age: number;
  role: string;
  belong: string | null;
};

const addUser = async (
  id: string,
  username: string,
  age: number,
  role: string,
  belong: string | null
) => {
  const { data, error } = await supabase.from("user").insert([
    {
      id: id,
      name: username,
      age: age,
      role: role,
      belong: belong || null,
    },
  ]);
  return { data, error };
};

const fetchUser = async (userId: string) => {
  const { data, error } = await supabase
    .from("user")
    .select("*")
    .eq("id", userId)
    .single();
  return { data, error };
};

const updateUser = async (
  id: string,
  username: string,
  age: number,
  role: string,
  belong: string | null
) => {
  const { data, error } = await supabase
    .from("user")
    .update({
      name: username,
      age: age,
      role: role,
      belong: belong || null,
    })
    .eq("id", id)
    .select();
  return { data, error };
};

export { addUser, fetchUser, updateUser, type UserData };
