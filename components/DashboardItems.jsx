import Link from 'next/link';
import styles from '../styles/DashboardItem.module.css';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
const DashboardItems = ({ concert }) => {
  const supabaseClient = useSupabaseClient();

  const handleDelete = async () => {
    console.log('Deleted');
  };
  console.log(concert.name);
  return (
    <div className={styles.concert}>
      <h4>
        <Link href={`/concert/${concert.slug}`}>{concert.name}</Link>
      </h4>

      <Link href={`/concert/edit/${concert.id}`} className={styles.edit}>
        Edit Event
      </Link>

      <a href="#" className={styles.delete} onClick={handleDelete}>
        Delete Event
      </a>
    </div>
  );
};

export default DashboardItems;
