import type { PickerValue } from "@mui/x-date-pickers/internals";
import { supabase } from "./supabase";

const addEvnet = async (
  name: string,
  date: PickerValue,
  company_id: string,
  description: string,
  place: string,
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
        place: place,
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

type EventWithSubjects = {
  id: string;
  created_at: string;
  event_name: string;
  date: string;
  company_id: string;
  description: string | null;
  place: string | null;
  event_subject: Array<{
    subject: {
      id: number;
      subject_name: string;
    } | null;
  }> | null;
  company?: {
    id: string;
    company_name: string;
  } | null;
};

const fetchEventsWithSubjects = async (place?: string, subjectId?: number) => {
  let query = supabase.from("event").select(
    `
      *,
      event_subject (
        subject (
          id,
          subject_name
        )
      ),
      company:company_id (
        id,
        company_name
      )
    `
  );

  // 都道府県でフィルタリング
  if (place) {
    query = query.eq("place", place);
  }

  const { data, error } = await query;

  // クライアント側でフィルタリング（教科が選択されている場合）
  // 選択された教科を「含む」イベントを抽出
  if (data && subjectId) {
    const filteredData = (data as EventWithSubjects[]).filter((event) => {
      // event_subjectが存在し、選択された教科IDを含むかチェック
      return event.event_subject?.some(
        (es) => es.subject?.id === subjectId
      );
    });
    return { data: filteredData, error };
  }

  return { data: data as EventWithSubjects[] | null, error };
};

const fetchEventById = async (eventId: string) => {
  const { data, error } = await supabase
    .from("event")
    .select(
      `
      *,
      event_subject (
        subject (
          id,
          subject_name
        )
      ),
      company:company_id (
        id,
        company_name
      )
    `
    )
    .eq("id", eventId)
    .single();

  return { data, error };
};

// イベントに申し込む
const applyToEvent = async (eventId: string, userId: string) => {
  const { data, error } = await supabase.from("event_user").insert([
    {
      event_id: eventId,
      user_id: userId,
    },
  ]);

  return { data, error };
};

// イベントの申し込み状況を確認
const checkUserApplication = async (eventId: string, userId: string) => {
  const { data, error } = await supabase
    .from("event_user")
    .select("*")
    .eq("event_id", eventId)
    .eq("user_id", userId)
    .maybeSingle();

  return { data, error };
};

// イベントに申し込んだユーザー一覧を取得
const fetchEventParticipants = async (eventId: string) => {
  const { data, error } = await supabase
    .from("event_user")
    .select(
      `
      *,
      user:user_id (
        id,
        name,
        age,
        role
      )
    `
    )
    .eq("event_id", eventId);

  return { data, error };
};

// 会社IDで絞り込んでイベント一覧を取得
const fetchEventsByCompanyId = async (companyId: string) => {
  const { data, error } = await supabase
    .from("event")
    .select(
      `
      *,
      event_subject (
        subject (
          id,
          subject_name
        )
      ),
      company:company_id (
        id,
        company_name
      )
    `
    )
    .eq("company_id", companyId)
    .order("date", { ascending: true });

  return { data: data as EventWithSubjects[] | null, error };
};

export {
  addEvnet,
  fetchEventsWithSubjects,
  fetchEventById,
  applyToEvent,
  checkUserApplication,
  fetchEventParticipants,
  fetchEventsByCompanyId,
};
export type { EventWithSubjects };
