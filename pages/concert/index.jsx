import ConcertItem from '../../components/ConcertItem';
import Layout from '../../components/Layout';
import supabase from '../../supabase';

const ConcertsPage = ({ concerts }) => {
  return (
    <Layout>
      <h1>Concerts</h1>

      {concerts.data.length === 0 && <h3>No concerts data to show</h3>}
      {concerts.data.map((cct) => (
        <ConcertItem key={cct.id} concert={cct} />
      ))}
    </Layout>
  );
};

export default ConcertsPage;

export async function getServerSideProps() {
  const res = await supabase
    .from('concert')
    .select('*, concert_image(id, url) '); // for multiple joins = ('*', table2(column_name))

  return { props: { concerts: res } };
}
