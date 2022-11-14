import Link from 'next/link';
import styles from '../styles/Header.module.css';
// import Search from './Search';
const Header = () => {
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">DJ Events</Link>
      </div>
      {/* <Search /> */}

      <nav>
        <ul>
          <li>
            <Link href="/concert">Concerts</Link>
          </li>

          <Link href="/concert/add">Add Concert</Link>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
