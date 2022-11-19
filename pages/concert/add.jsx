import Link from 'next/link';
import Layout from '../../components/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormConcert from '../../components/Form';
import { useRouter } from 'next/router';
import { countSameSlug, supabase } from '../../config/supabase';
import { useState } from 'react';
import { createSlug, formatName } from '../../config/utils';

const AddConcertPage = () => {
  const router = useRouter();

  const [image, setImage] = useState();

  const handleSubmit = async (values) => {
    values.name = formatName(values.name);

    const slug = `${createSlug(values.name)}-${
      (await countSameSlug(values.name)) + 1
    }`;

    values.slug = slug;

    const { data } = await supabase.from('concert').insert(values).select();

    console.log(data);

    // if (!res.ok) toast.error('Something Went Wrong');
    // else router.push('/events');
  };

  const handleImageChange = (e) => {
    console.log(e.target.files[0]);

    if (image) {
      // Add image to storage but wait for the id of the concert
      console.log('Image state not empty');
    } else console.log('Image state Empty');
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
        formType="create"
        handleImageChange={handleImageChange}
      />
    </Layout>
  );
};

export default AddConcertPage;
