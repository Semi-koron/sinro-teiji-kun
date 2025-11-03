import { Card, CardActionArea, CardContent, CardMedia } from "@mui/material";

type contentCardProps = {
    title: string;
    description: string;
    subject: string;
    region: string;
    prefecture: string;
    imgUrl: string;
};

export default function ContentCard({ title, description, subject, region, prefecture, imgUrl }: contentCardProps) {
    return (
        <Card sx={{minWidth: 500, marginRight: 2, marginBottom: 2}}>
            <CardActionArea
                sx={{
                    display: "flex",
                    flexDirection: "row",
                    alignItems: "flex-start",
                }}
            >
                <CardMedia
                    component="img"
                    sx={{width: 150, height: 150}}
                    image={imgUrl}
                    alt={title}
                />
                <CardContent>
                    <h2>{title}</h2>
                    <p>{description}</p>
                    <p>
                        教科: {subject}　　都道府県: {prefecture}
                    </p>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}