import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import styles from '../styles/Header.module.css';
// import Search from './Search';
const Header = () => {
  const supabaseClient = useSupabaseClient();
  const router = useRouter();
  const user = useUser();
  const [isLoading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(false);
  }, [user]);

  const handleSignOut = async () => {
    const { error } = await supabaseClient.auth.signOut();
    if (!error) {
      console.log('Successfully Log Out');
      router.push('/login');
    }
  };

  const RenderNavItems = () => {
    if (!user) {
      return (
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
      );
    } else if (user)
      return (
        <>
          <li>
            <Link href="/dashboard">Dashboard</Link>
          </li>

          <li>
            <Link href="/concert/add">Add Concert</Link>
          </li>

          <li onClick={handleSignOut}>Sign Out</li>
        </>
      );
  };
  return (
    <header className={styles.header}>
      <div className={styles.logo}>
        <Link href="/">DJ Events</Link>
      </div>

      <nav>
        <ul>{!isLoading ? <RenderNavItems /> : <></>}</ul>
      </nav>
    </header>
  );
};
export default Header;
