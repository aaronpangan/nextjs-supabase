import Link from 'next/link';
import Layout from '../../components/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormConcert from '../../components/Form';
import { useRouter } from 'next/router';
import supabase from '../../config/supabase';

const AddConcertPage = () => {
  const router = useRouter();

  const handleSubmit = async (values) => {
    

    if (!res.ok) toast.error('Something Went Wrong');
    // else router.push('/events');
  };

  return (
    <Layout>
      <Link href="/concert">Go Back</Link>
      <h1>Add Concert</h1>
      <ToastContainer />

      <FormConcert
        handleSubmit={handleSubmit}
        buttonName="Add Concert"
        formInitValues={null}
      />
    </Layout>
  );
};

export default AddConcertPage;
