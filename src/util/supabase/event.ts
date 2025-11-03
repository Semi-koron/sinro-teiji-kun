import type { PickerValue } from "@mui/x-date-pickers/internals";
import { supabase } from "./supabase";

const addEvnet = async (
  name: string,
  date: PickerValue,
  company_id: string,
  description: string,
  subject_ids: number[] = []
) => {
  const postDate = date?.toDate();

  // イベントを作成
  const { data: eventData, error: eventError } = await supabase
    .from("event")
    .insert([
      {
        event_name: name,
        date: postDate,
        company_id: company_id,
        description: description,
      },
    ])
    .select()
    .single();

  if (eventError || !eventData) {
    return { data: null, error: eventError };
  }

  // 教科が選択されている場合、中間テーブルにレコードを作成
  if (subject_ids.length > 0) {
    const eventSubjectRecords = subject_ids.map((subject_id) => ({
      event_id: eventData.id,
      subject_id: subject_id,
    }));

    const { error: relationError } = await supabase
      .from("event_subject")
      .insert(eventSubjectRecords);

    if (relationError) {
      return { data: eventData, error: relationError };
    }
  }

  return { data: eventData, error: null };
};

export { addEvnet };
