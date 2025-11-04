import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { prefOptions } from "./optionList";
import MenuBar from "../dashboard/menuBar";
import { TextField, Autocomplete, Box, Button } from "@mui/material";
import ContentCard from "../dashboard/contentCard";
import {
  fetchEventsWithSubjects,
  type EventWithSubjects,
} from "../../../util/supabase/event";
import { fetchSubject, type Subject } from "../../../util/supabase/subject";
import { supabase } from "../../../util/supabase/supabase";
import { fetchUser } from "../../../util/supabase/user";

const DashboardPage = () => {
  const navigate = useNavigate();
  const [pref, setPref] = useState<string | null>(null);
  const [selectedSubjectId, setSelectedSubjectId] = useState<number | null>(
    null
  );
  const [subjects, setSubjects] = useState<Subject[]>([]);
  const [events, setEvents] = useState<EventWithSubjects[]>([]);

  // イベントを読み込む関数
  const loadEvents = async (prefecture?: string, subjectId?: number) => {
    const { data, error } = await fetchEventsWithSubjects(
      prefecture,
      subjectId
    );
    if (error) {
      console.error("Error fetching events:", error.message);
    } else {
      console.log("Events fetched successfully:", data);
      setEvents(data || []);
    }
  };

  // 初回ロード時にユーザー認証チェック、教科一覧とイベントを取得
  useEffect(() => {
    const checkUserAndLoadData = async () => {
      // 現在のセッションを取得
      const {
        data: { session },
      } = await supabase.auth.getSession();

      // ログインしている場合、ユーザーデータが存在するかチェック
      if (session?.user) {
        const { data: userData, error: userError } = await fetchUser(
          session.user.id
        );

        if (userError || !userData) {
          // ユーザーデータが見つからない場合、プロフィール登録ページに遷移
          console.log(
            "User data not found, redirecting to profile registration"
          );
          navigate("/signup/profile");
          return;
        }
      }

      // 教科一覧を取得
      fetchSubject().then(({ data, error }) => {
        if (error) {
          console.error("Error fetching subjects:", error.message);
        } else {
          console.log("Subjects fetched successfully:", data);
          setSubjects(data || []);
        }
      });

      // 初回のイベント一覧を取得
      loadEvents();
    };

    checkUserAndLoadData();
  }, [navigate]);

  const handleSearch = () => {
    // 選択された都道府県と教科IDでフィルタリング
    loadEvents(pref || undefined, selectedSubjectId || undefined);
  };

  return (
    <div>
      <MenuBar />
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-between",
          gap: 2,
          marginTop: 6,
          border: "1px solid lightgray",
          padding: 1,
          borderRadius: 1,
        }}
      >
        <Autocomplete
          sx={{ minWidth: 200 }}
          options={prefOptions}
          getOptionLabel={(option) => option.pref}
          groupBy={(option) => option.region}
          renderInput={(params) => (
            <TextField {...params} label="地域" variant="outlined" />
          )}
          onChange={(_event, value) => setPref(value ? value.pref : null)}
        />
        <Autocomplete
          sx={{ minWidth: 200 }}
          options={subjects}
          getOptionLabel={(option) => option.subject_name}
          renderInput={(params) => (
            <TextField {...params} label="教科" variant="outlined" />
          )}
          onChange={(_event, value) =>
            setSelectedSubjectId(value ? value.id : null)
          }
        />
        <Button variant="contained" onClick={handleSearch}>
          検索
        </Button>
      </Box>

      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          flexWrap: "wrap",
          marginTop: 2,
          width: "100%",
        }}
      >
        {events &&
          events.map((event) => {
            // イベントに関連する教科名を結合
            const subjectNames =
              event.event_subject
                ?.map((es) => es.subject?.subject_name)
                .filter((name): name is string => !!name)
                .join(", ") || "未設定";

            return (
              <ContentCard
                key={event.id}
                id={event.id}
                title={event.event_name}
                description={event.description || ""}
                subject={subjectNames}
                prefecture={event.place || "未設定"}
                companyName={event.company?.company_name}
                companyId={event.company?.id}
              />
            );
          })}
      </Box>
    </div>
  );
};

export default DashboardPage;
