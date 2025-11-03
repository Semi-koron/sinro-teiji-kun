// src/pages/CompanyIntro.tsx
import styles from "./index.module.css";
import { type Event } from "./eventdata.ts";

// 企業情報のダミーデータ
const companyData = {
  name: "株式会社マイナビ",
  slogan: "未来は、きみのもの。",
  business: [
    "人材情報サービス（求人、転職、新卒、アルバイトなど）",
    "進学情報サービス（マイナビ進学）",
    "住宅・ウェディング・農業など多岐にわたる生活情報サービス",
  ],
  recruit: {
    jobTitle: "総合職（企画・営業）",
    target: "2026年3月卒業見込みの方",
    location: "東京、大阪、名古屋、福岡 ほか全国主要都市",
  },
};



export default function CompanyIntro() {

  return (
    <h1>hello world!</h1>
    //<p>{Event[0].id}</p>
  );
}