import Link from 'next/link';
import Layout from '../components/Layout';

import ConcertItem from '../components/ConcertItem';
import {supabase} from '../config/supabase';

export default function Home({ concert }) {
  return (
    <Layout>
      <h1>Upcoming Concert</h1>
      {concert.data.length === 0 && <h3>No concert to show</h3>}
      {concert.data.map((crt) => (
        <ConcertItem key={crt.id} concert={crt} />
      ))}

      {concert.data.length > 0 && (
        <Link href="/concert" className="btn-secondary">
          View All Concert
        </Link>
      )}
    </Layout>
  );
}

export async function getServerSideProps() {
  const res = await supabase
    .from('concert')
    .select('*, concert_image(id, url) '); // for multiple joins = ('*', table2(column_name))

  return { props: { concert: res } };
}
