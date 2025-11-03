<div className={styles.container}>
      {/* 1. ヘッダーセクション */}
      <header className={styles.header}>
        <h1 className={styles.companyName}>{companyData.name}</h1>
        <p className={styles.slogan}>— {companyData.slogan} —</p>
      </header>

      {/* 2. 事業内容セクション */}
      <section className={styles.section}>
        <h2>事業内容</h2>
        <p className={styles.leadText}>
          若者の進路選択から、社会人のキャリアアップ、そして生活全般に関わる情報提供を通じて、ユーザーの人生をサポートしています。
        </p>
        <ul className={styles.businessList}>
          {companyData.business.map((item, index) => (
            <li key={index}>✅ {item}</li>
          ))}
        </ul>
      </section>

      {/* 3. 募集要項セクション */}
      <section className={styles.section}>
        <h2>募集要項（新卒）</h2>
        <div className={styles.detailGrid}>
          <div>
            <p className={styles.detailLabel}>募集職種</p>
            <p className={styles.detailValue}>{companyData.recruit.jobTitle}</p>
          </div>
          <div>
            <p className={styles.detailLabel}>募集対象</p>
            <p className={styles.detailValue}>{companyData.recruit.target}</p>
          </div>
          <div>
            <p className={styles.detailLabel}>勤務地</p>
            <p className={styles.detailValue}>{companyData.recruit.location}</p>
          </div>
        </div>
      </section>

      {/* 4. フッター */}
      <footer className={styles.footer}>
        <a href="https://www.mynavi.jp/" target="_blank" rel="noopener noreferrer">
          &gt;&gt; 公式サイトを見る
        </a>
      </footer>
    </div>