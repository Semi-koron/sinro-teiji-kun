import { supabase } from "./supabase";

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

export { addUser };
