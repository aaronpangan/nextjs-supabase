import {supabase} from './../../../config/supabase';
import Link from 'next/link';
import FormEvent from '../../../components/Form';
import Layout from '../../../components/Layout';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';

function EditPage({ concert }) {
  const [image, setImage] = useState();

  const handleSubmit = async (values) => {
    delete values.concert_image;
    const { data, error } = await supabase
      .from('concert')
      .update(values)
      .eq('id', 1)
      .select();




      if (image){

        
      }
    console.log(data);
  };

  const handleImageChange = (e) => {
    console.log(e.target.files[0]);

    if (image) {
      // Delete The Image if there is any and upload new one
      console.log('Image state not empty');
    } else console.log('Image state Empty');
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
        formType="update"
        handleImageChange={handleImageChange}
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
