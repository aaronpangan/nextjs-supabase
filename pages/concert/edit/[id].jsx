import { supabase } from './../../../config/supabase';
import Link from 'next/link';
import FormEvent from '../../../components/ConcertForm';
import Layout from '../../../components/Layout';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';

function EditPage({ concert, currentConcertImage }) {
  const [image, setImage] = useState();

  const handleSubmit = async (values) => {
    delete values.concert_image;
    const { data } = await supabase
      .from('concert')
      .update(values)
      .eq('id', concert.id)
      .select();
    if (image) {
      if (currentConcertImage) {
        // Delete image in bucket
        // ADd new Image in bucket

        const uploadNewImage = await supabase.storage
          .from('image')
          .upload(`concert/${image.name}-${uuidv4()}`, image);

        const addImage = await supabase
          .from('concert_image')
          .update({
            url:
              process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL +
              uploadNewImage.data.path,
            path: uploadNewImage.data.path,
          })
          .eq('concert_id', data[0].id)
          .select();

        const deleteImage = await supabase.storage
          .from('image')
          .remove([`${currentConcertImage.path}`]);

        // Update table in concert_iamge
      } else {
        // Add new Image in bucket
        // Create new data in concert_images

        const uploadNewImage = await supabase.storage
          .from('image')
          .upload(`concert/${image.name}-${uuidv4()}`, image);

        const addImage = await supabase
          .from('concert_image')
          .insert({
            concert_id: data[0].id,
            url:
              process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL +
              uploadNewImage.data.path,
            path: uploadNewImage.data.path,
          })
          .select();
      }
    }
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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
    .select('*, concert_image(id, url, path) ')
    .eq('id', id);

  if (res.data.length === 0)
    return {
      notFound: true,
    };

  return {
    props: {
      concert: res.data[0],
      currentConcertImage:
        res.data[0].concert_image.length > 0
          ? res.data[0].concert_image[0]
          : null,
    },
  };
}

export default EditPage;
