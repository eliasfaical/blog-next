import Link from 'next/link';
import styles from './header.module.scss';

export default function Header() {
  return (
    <header className={styles.siteHeader}>
      <div className={styles.container}>
        <Link href="/">
          <a title="Spacetraveling">
            <img src="/images/logo.svg" alt="Spacetraveling" />
          </a>
        </Link>
      </div>
    </header>
  );
}
