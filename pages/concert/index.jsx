import ConcertItem from '../../components/ConcertItem';
import Layout from '../../components/Layout';
import Pagination from '../../components/Pagination';
import { supabase } from '../../config/supabase';
import { getPaginationRange } from '../../config/utils';

const ConcertsPage = ({ concerts, page }) => {
  return (
    <Layout>
      <h1>Concerts</h1>

      {concerts.data.length === 0 && <h3>No concerts data to show</h3>}
      {concerts.data.map((cct) => (
        <ConcertItem key={cct.id} concert={cct} />
      ))}
      <Pagination page={page} totalConcert={concerts.count} />
    </Layout>
  );
};

export default ConcertsPage;

export async function getServerSideProps({ query: { page = 1 } }) {
  console.log(page);
  const { from, to } = getPaginationRange(page);
  console.log(`FROM : ${from} || TO : ${to}`);

  const res = await supabase
    .from('concert')
    .select('*, concert_image(id, url) ', { count: 'exact' })
    .range(from, to)
    .order('date', { ascending: true }); // for multiple joins = ('*', table2(column_name))

  console.log(res.status);
  console.log(`Total Concert: ${res.count}`);

  if (res.status === 416 || res.status === 500)
    return {
      notFound: true,
    };

  return { props: { concerts: res, page: +page } };
}
