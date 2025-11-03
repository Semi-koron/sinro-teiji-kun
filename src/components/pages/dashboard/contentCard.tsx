import { Card, CardActionArea, CardContent, Link } from "@mui/material";
import { useNavigate } from "react-router-dom";

type contentCardProps = {
  id: string | number;
  title: string;
  description: string;
  subject: string;
  prefecture: string;
  companyName?: string;
  companyId?: string;
};

export default function ContentCard({
  id,
  title,
  description,
  subject,
  prefecture,
  companyName,
  companyId,
}: contentCardProps) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/event/${id}`);
  };

  const handleCompanyClick = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (companyId) {
      navigate(`/company/${companyId}`);
    }
  };

  return (
    <Card
      sx={{ minWidth: 500, marginRight: 2, marginBottom: 2, textAlign: "left" }}
    >
      <CardActionArea
        onClick={handleClick}
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "flex-start",
        }}
      >
        <CardContent>
          <h2>{title}</h2>
          <p>{description}</p>
          <p>教科: {subject}</p>
          <p>都道府県: {prefecture}</p>
          {companyName && (
            <p>
              企業:{" "}
              <Link
                component="button"
                variant="body1"
                onClick={handleCompanyClick}
                sx={{ cursor: "pointer", textDecoration: "underline" }}
              >
                {companyName}
              </Link>
            </p>
          )}
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
