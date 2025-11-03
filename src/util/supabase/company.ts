import { supabase } from "./supabase";

type Company = {
  id: string;
  created_at: string;
  company_name: string;
};

const addCompany = async (name: string) => {
  const { data, error } = await supabase
    .from("company")
    .insert([{ company_name: name }]);
  return { data, error };
};

export { addCompany, type Company };
