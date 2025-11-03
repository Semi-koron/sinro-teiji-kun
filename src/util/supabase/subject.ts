import { supabase } from "./supabase";

type Subject = {
  id: number;
  subject_name: string;
  created_at: string;
};

const fetchSubject = async () => {
  const { data, error } = await supabase
    .from("subject")
    .select("*")
    .order("id", { ascending: true });

  return { data, error };
};

export { fetchSubject };
export type { Subject };
