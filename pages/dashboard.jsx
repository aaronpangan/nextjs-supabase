import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import DashboardItems from '../components/DashboardItems';
import Layout from '../components/Layout';
import styles from '../styles/Dashboard.module.css';
const DashboardPage = ({ concert }) => {
  console.log(concert);

  return (
    <Layout>
      <div className={styles.dash}>
        <h1>Dashboard</h1>
        <h3>Concerts</h3>

        {concert.map((concertItem) => (
          <DashboardItems key={concertItem.id} concert={concertItem} />
        ))}
      </div>
    </Layout>
  );
};

export default DashboardPage;

export async function getServerSideProps(ctx) {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      redirect: {
        destination: '/login',
        permanent: false,
      },
    };

  const { data } = await supabase
    .from('concert')
    .select('*, concert_image(id, url) ')
    .eq('user_id', session.user.id)
    .order('date', { ascending: true });

  return { props: { concert: data } };
}
