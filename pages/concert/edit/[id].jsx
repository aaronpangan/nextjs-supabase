import Link from 'next/link';
import FormEvent from '../../../components/ConcertForm';
import Layout from '../../../components/Layout';
import { ToastContainer, toast } from 'react-toastify';
import { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { useSupabaseClient, useUser } from '@supabase/auth-helpers-react';
import { useRouter } from 'next/router';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

function EditPage({ concert, currentConcertImage }) {
  const supabaseClient = useSupabaseClient();

  const user = useUser();
  const router = useRouter();
  const [image, setImage] = useState();

  const handleSubmit = async (values) => {
    delete values.concert_image;
    const { data } = await supabaseClient
      .from('concert')
      .update(values)
      .eq('id', concert.id)
      .eq('user_id', user.id)
      .select();
    if (image) {
      if (currentConcertImage) {
        // Delete image in bucket
        // ADd new Image in bucket

        const uploadNewImage = await supabaseClient.storage
          .from('image')
          .upload(`concert/${image.name}-${uuidv4()}`, image);

        const addImage = await supabaseClient
          .from('concert_image')
          .update({
            url:
              process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL +
              uploadNewImage.data.path,
            path: uploadNewImage.data.path,
          })
          .eq('concert_id', data[0].id)
          .select();

        const deleteImage = await supabaseClient.storage
          .from('image')
          .remove([`${currentConcertImage.path}`]);

        // Update table in concert_iamge
      } else {
        // Add new Image in bucket
        // Create new data in concert_images

        const uploadNewImage = await supabaseClient.storage
          .from('image')
          .upload(`concert/${image.name}-${uuidv4()}`, image);

        const addImage = await supabaseClient
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
    router.push('/dashboard');
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

export async function getServerSideProps(ctx) {
  const id = ctx.query.id;
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session)
    return {
      notFound: true,
    };

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
