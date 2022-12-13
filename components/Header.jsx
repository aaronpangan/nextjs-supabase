import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Header.module.css';
// import Search from './Search';
const Header = () => {
  const user = useUser();
  const supabaseClient = useSupabaseClient();
  const router = useRouter();

  const handleSignOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (!error) {
      console.log('Successfully Log Out');
      router.push('/login');
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">DJ Events</Link>
      </div>
      {/* <Search /> */}

      <nav>
        <ul>
          {!user ? (
            <>
              <li>
                <Link href="/concert">Concerts</Link>
              </li>

              <li>
                <Link href="/login">Sign In</Link>
              </li>
              <li>
                <Link href="/register">Sign Up</Link>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link href="/dashboard">Dashboard</Link>
              </li>

              <li>
                <Link href="/concert/add">Add Concert</Link>
              </li>

              <li onClick={handleSignOut}>Sign Out</li>
            </>
          )}
        </ul>
      </nav>
    </header>
  );
};
export default Header;
