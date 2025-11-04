import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Chip,
  Stack,
  Button,
  List,
  ListItem,
  ListItemText,
  Alert,
  CardActionArea,
} from "@mui/material";
import {
  fetchEventById,
  applyToEvent,
  checkUserApplication,
  fetchEventParticipants,
} from "../../../util/supabase/event";
import Header from "../../common/Header";
import type { Subject } from "../../../util/supabase/subject";
import { supabase } from "../../../util/supabase/supabase";

type EventDetail = {
  id: string;
  event_name: string;
  description: string;
  place: string;
  date: string;
  created_at: string;
  company_id: string;
  event_subject: { subject: Subject }[];
  company: {
    id: string;
    company_name: string;
  };
};

type Participant = {
  id: number;
  event_id: string;
  user_id: string;
  user: {
    id: string;
    name: string;
    age: number;
    role: string;
  };
};

const EventPage = () => {
  const { eventId } = useParams<{ eventId: string }>();
  const navigate = useNavigate();
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [currentUserId, setCurrentUserId] = useState<string | null>(null);
  const [hasApplied, setHasApplied] = useState(false);
  const [participants, setParticipants] = useState<Participant[]>([]);
  const [applying, setApplying] = useState(false);

  useEffect(() => {
    if (!eventId) return;

    const loadEventData = async () => {
      // 現在のユーザーを取得
      const { data: { session } } = await supabase.auth.getSession();
      const userId = session?.user?.id || null;
      setCurrentUserId(userId);

      // イベント詳細を取得
      const { data: eventData, error: eventError } = await fetchEventById(eventId);
      if (eventError) {
        console.error("Error fetching event:", eventError.message);
      } else {
        console.log("Event fetched successfully:", eventData);
        setEvent(eventData);
      }

      // 参加者一覧を取得
      const { data: participantsData, error: participantsError } = await fetchEventParticipants(eventId);
      if (participantsError) {
        console.error("Error fetching participants:", participantsError.message);
      } else {
        console.log("Participants fetched successfully:", participantsData);
        setParticipants(participantsData || []);
      }

      // 現在のユーザーが申し込み済みかチェック
      if (userId) {
        const { data: applicationData } = await checkUserApplication(eventId, userId);
        setHasApplied(!!applicationData);
      }

      setLoading(false);
    };

    loadEventData();
  }, [eventId]);

  // 申し込み処理
  const handleApply = async () => {
    if (!currentUserId || !eventId) return;

    setApplying(true);
    const { error } = await applyToEvent(eventId, currentUserId);

    if (error) {
      console.error("Error applying to event:", error.message);
      alert("申し込みに失敗しました: " + error.message);
    } else {
      setHasApplied(true);
      // 参加者一覧を再取得
      const { data: participantsData } = await fetchEventParticipants(eventId);
      setParticipants(participantsData || []);
      alert("申し込みが完了しました！");
    }

    setApplying(false);
  };

  if (loading) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>読み込み中...</Typography>
      </Box>
    );
  }

  if (!event) {
    return (
      <Box sx={{ p: 4 }}>
        <Typography>イベントが見つかりませんでした。</Typography>
      </Box>
    );
  }

  // 教科名を取得
  const subjects = event.event_subject
    ?.map((es) => es.subject?.subject_name)
    .filter(Boolean);

  // 日付のフォーマット
  const eventDate = event.date ? new Date(event.date).toLocaleDateString("ja-JP") : "未定";

  return (
      <>
          <Header title="イベント詳細" />
          <Box sx={{p: 4, maxWidth: 1200, margin: "0 auto"}}>
              <Card>
                  <CardContent>
                      <Typography
                          variant="h4"
                          component="h1"
                          gutterBottom
                      >
                          {event.event_name}
                      </Typography>

                      <Stack
                          direction="row"
                          spacing={1}
                          sx={{mb: 2}}
                      >
                          <Chip
                              label={event.place}
                              color="primary"
                              variant="outlined"
                          />
                          <Chip
                              label={eventDate}
                              color="secondary"
                              variant="outlined"
                          />
                      </Stack>

                      <Box sx={{mb: 3}}>
                          <Typography
                              variant="h6"
                              gutterBottom
                          >
                              概要
                          </Typography>
                          <Typography
                              variant="body1"
                              paragraph
                          >
                              {event.description}
                          </Typography>
                      </Box>

                      <Box sx={{mb: 3}}>
                          <Typography
                              variant="h6"
                              gutterBottom
                          >
                              関連する教科
                          </Typography>
                          <Stack
                              direction="row"
                              spacing={1}
                          >
                              {subjects && subjects.length > 0 ? (
                                  subjects.map((subject, index) => (
                                      <Chip
                                          key={index}
                                          label={subject}
                                      />
                                  ))
                              ) : (
                                  <Typography
                                      variant="body2"
                                      color="text.secondary"
                                  >
                                      未設定
                                  </Typography>
                              )}
                          </Stack>
                      </Box>

                      <Box sx={{mb: 3}}>
                          <Typography
                              variant="h6"
                              gutterBottom
                          >
                              企業情報
                          </Typography>
                          <Card variant="outlined">
                              <CardActionArea
                                  onClick={() => {
                                      if (event.company?.id) {
                                          navigate(
                                              `/company/${event.company.id}`,
                                          );
                                      }
                                  }}
                              >
                                  <CardContent>
                                      <Typography variant="h6">
                                          {event.company?.company_name ||
                                              "未設定"}
                                      </Typography>
                                  </CardContent>
                              </CardActionArea>
                          </Card>
                      </Box>

                      {/* 申し込みボタン */}
                      <Box sx={{mb: 3}}>
                          {currentUserId ? (
                              hasApplied ? (
                                  <Alert severity="info">
                                      このイベントに申し込み済みです
                                  </Alert>
                              ) : (
                                  <Button
                                      variant="contained"
                                      color="primary"
                                      size="large"
                                      onClick={handleApply}
                                      disabled={applying}
                                      fullWidth
                                  >
                                      {applying
                                          ? "申し込み中..."
                                          : "このイベントに申し込む"}
                                  </Button>
                              )
                          ) : (
                              <Alert severity="warning">
                                  イベントに申し込むにはログインが必要です
                              </Alert>
                          )}
                      </Box>

                      {/* 参加者一覧 */}
                      <Box sx={{mb: 3}}>
                          <Typography
                              variant="h6"
                              gutterBottom
                          >
                              参加者一覧 ({participants.length}名)
                          </Typography>
                          {participants.length > 0 ? (
                              <Card variant="outlined">
                                  <CardContent>
                                      <List>
                                          {participants.map((participant) => (
                                              <ListItem
                                                  key={participant.id}
                                                  divider
                                              >
                                                  <ListItemText
                                                      primary={
                                                          participant.user
                                                              ?.name ||
                                                          "名前非表示"
                                                      }
                                                      secondary={`年齢: ${participant.user?.age}歳 | 役割: ${participant.user?.role}`}
                                                  />
                                              </ListItem>
                                          ))}
                                      </List>
                                  </CardContent>
                              </Card>
                          ) : (
                              <Typography
                                  variant="body2"
                                  color="text.secondary"
                              >
                                  まだ参加者がいません
                              </Typography>
                          )}
                      </Box>
                  </CardContent>
              </Card>
          </Box>
      </>
  );
};

export default EventPage;
