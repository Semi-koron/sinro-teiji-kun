import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Card, CardContent, Typography } from "@mui/material";
import { fetchCompanyById, type Company } from "../../../util/supabase/company";
import {
  fetchEventsByCompanyId,
  type EventWithSubjects,
} from "../../../util/supabase/event";
import ContentCard from "../dashboard/contentCard";
import Header from "../../common/Header";

const CompanyPage = () => {
  const { companyId } = useParams<{ companyId: string }>();
  const [company, setCompany] = useState<Company | null>(null);
  const [events, setEvents] = useState<EventWithSubjects[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!companyId) return;

    const loadCompanyData = async () => {
      // 会社情報を取得
      const { data: companyData, error: companyError } =
        await fetchCompanyById(companyId);
      if (companyError) {
        console.error("Error fetching company:", companyError.message);
      } else {
        console.log("Company fetched successfully:", companyData);
        setCompany(companyData);
      }

      // 会社が出しているイベント一覧を取得
      const { data: eventsData, error: eventsError } =
        await fetchEventsByCompanyId(companyId);
      if (eventsError) {
        console.error("Error fetching events:", eventsError.message);
      } else {
        console.log("Events fetched successfully:", eventsData);
        setEvents(eventsData || []);
      }

      setLoading(false);
    };

    loadCompanyData();
  }, [companyId]);

  if (loading) {
    return (
      <div>
        <Header title="企業情報" />
        <Box sx={{ p: 4, mt: 10 }}>
          <Typography>読み込み中...</Typography>
        </Box>
      </div>
    );
  }

  if (!company) {
    return (
      <div>
        <Header title="企業情報" />
        <Box sx={{ p: 4, mt: 10 }}>
          <Typography>企業が見つかりませんでした。</Typography>
        </Box>
      </div>
    );
  }

  return (
    <div>
      <Header title="企業情報" />
      <Box sx={{ p: 4, mt: 10 }}>
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h4" component="h1" gutterBottom>
              {company.company_name}
            </Typography>
          </CardContent>
        </Card>

        <Typography variant="h5" gutterBottom>
          この企業が開催するイベント ({events.length}件)
        </Typography>

        {events.length > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {events.map((event) => {
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
        ) : (
          <Typography variant="body1" color="text.secondary">
            現在開催予定のイベントはありません。
          </Typography>
        )}
      </Box>
    </div>
  );
};

export default CompanyPage;
