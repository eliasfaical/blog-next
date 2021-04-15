import Link from 'next/link';
import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles.siteHeader}>
      <div className={styles.container}>
        <Link href="/">
          <img src="/images/logo.svg" alt="Spacetraveling" />
        </Link>
      </div>
    </header>
  );
}
