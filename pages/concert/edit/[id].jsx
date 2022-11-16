import supabase from './../../../config/supabase';
import Link from 'next/link';
import FormEvent from '../../../components/Form';
import Layout from '../../../components/Layout';
import { ToastContainer, toast } from 'react-toastify';

function EditPage({ concert }) {
  const handleSubmit = async (values) => {
    // const res = await supabase
    //   .from('concert')
    //   .select('*, concert_image(id, url) ')
    //   .eq('id', id);
    // console.log(res);
  };

  return (
    <Layout>
      <Link href="/concert">Go Back</Link>
      <h1>Update Concert</h1>
      <ToastContainer />

      <FormEvent
        handleSubmit={handleSubmit}
        formInitValues={concert}
        buttonName="Update Event"
      />
    </Layout>
  );
}

export async function getServerSideProps({ query: { id } }) {
  const res = await supabase
    .from('concert')
    .select('*, concert_image(id, url) ')
    .eq('id', id);
  return { props: { concert: res.data[0] } };
}

export default EditPage;
