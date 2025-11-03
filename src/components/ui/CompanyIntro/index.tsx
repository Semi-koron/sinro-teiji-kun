// src/pages/CompanyIntro.tsx
import styles from "./index.module.css";
import { eventdate } from "./eventdata.ts";


export default function Home() {

  return (
<div className={styles.container}>
      {/* 1. ヘッダーセクション */}
      <header className={styles.header}>
        <h1 className={styles.companyName}>企業名</h1>
      </header>

      {/* 2. 事業内容セクション */}
      <section className={styles.section}>
        <h2>事業内容</h2>
        <p className={styles.leadText}>
          事業説明を入れる
        </p>
      </section>

      {/* 3. 募集要項セクション */}

      
      <section className={styles.section}>
        <h2>イベント説明</h2>
        <div className={styles.detailGrid}>
          <div>
            <p className={styles.detailLabel}>イベント名</p>
            <p className={styles.detailValue}>{eventdate[0].event_name}</p>
          </div>
          <div>
            <p className={styles.detailLabel}>日時</p>
            <p className={styles.detailValue}>{eventdate[0].data}</p>
          </div>
          <div>
            <p className={styles.detailLabel}>詳細</p>
            <p className={styles.detailValue}>{eventdate[0].description}</p>
          </div>
        </div>
      </section>

      {/* 4. フッター */}
      <footer className={styles.footer}>
        <a 
        className={styles.applicationButton}
        >
          ✅ イベントに申し込む
          </a>
          </footer>
          </div>);
}