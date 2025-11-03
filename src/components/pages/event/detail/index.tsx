import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Card, CardContent, Typography, Chip, Stack } from "@mui/material";
import { fetchEventById } from "../../../../util/supabase/event";
import type { Subject } from "../../../../util/supabase/subject";

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
    description: string;
  };
};

const EventDetailPage = () => {
  const { id } = useParams<{ id: string }>();
  const [event, setEvent] = useState<EventDetail | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const loadEvent = async () => {
      const { data, error } = await fetchEventById(id);
      if (error) {
        console.error("Error fetching event:", error.message);
      } else {
        console.log("Event fetched successfully:", data);
        setEvent(data);
      }
      setLoading(false);
    };

    loadEvent();
  }, [id]);

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
    <Box sx={{ p: 4, maxWidth: 1200, margin: "0 auto" }}>
      <Card>
        <CardContent>
          <Typography variant="h4" component="h1" gutterBottom>
            {event.event_name}
          </Typography>

          <Stack direction="row" spacing={1} sx={{ mb: 2 }}>
            <Chip label={event.place} color="primary" variant="outlined" />
            <Chip label={eventDate} color="secondary" variant="outlined" />
          </Stack>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              概要
            </Typography>
            <Typography variant="body1" paragraph>
              {event.description}
            </Typography>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              関連する教科
            </Typography>
            <Stack direction="row" spacing={1}>
              {subjects && subjects.length > 0 ? (
                subjects.map((subject, index) => (
                  <Chip key={index} label={subject} />
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  未設定
                </Typography>
              )}
            </Stack>
          </Box>

          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              企業情報
            </Typography>
            <Card variant="outlined">
              <CardContent>
                <Typography variant="h6">{event.company?.company_name || "未設定"}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {event.company?.description || "説明なし"}
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </CardContent>
      </Card>
    </Box>
  );
};

export default EventDetailPage;
