import styles from './styles.module.css';

interface LayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: LayoutProps) {
  return (
    <div className={styles.layout}>
      <div className={styles.background}>
        <div className={styles.gradientOrb1}></div>
        <div className={styles.gradientOrb2}></div>
        <div className={styles.noise}></div>
      </div>
      
      <main className={styles.main}>
        <header className={styles.header}>
          <div className={styles.logo}>
            <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="3" y="3" width="7" height="7" rx="1" />
              <rect x="14" y="3" width="7" height="7" rx="1" />
              <rect x="3" y="14" width="7" height="7" rx="1" />
              <rect x="14" y="14" width="3" height="3" />
              <rect x="18" y="14" width="3" height="3" />
              <rect x="14" y="18" width="3" height="3" />
              <rect x="18" y="18" width="3" height="3" />
            </svg>
          </div>
          <h1 className={styles.title}>QR Generator</h1>
          <p className={styles.subtitle}>极简二维码生成器</p>
        </header>

        <div className={styles.content}>
          {children}
        </div>

        <footer className={styles.footer}>
          <p>无需注册 · 无需安装 · 即时生成</p>
        </footer>
      </main>
    </div>
  );
}

export default Layout;
