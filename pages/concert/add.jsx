import Link from 'next/link';
import Layout from '../../components/Layout';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import FormConcert from '../../components/ConcertForm';
import { useRouter } from 'next/router';
import { supabase } from '../../config/supabase';
import { useState } from 'react';
import { createSlug, formatName } from '../../config/utils';
import { v4 as uuidv4 } from 'uuid';
import { useUser } from '@supabase/auth-helpers-react';

const AddConcertPage = () => {
  const router = useRouter();
  const user = useUser()
  const [image, setImage] = useState();

  const handleSubmit = async (values) => {
    values.user_id = user.id
   
    values.name = formatName(values.name);

    const { count } = await supabase
      .from('concert')
      .select('*', { count: 'exact' })
      .ilike('name', `%${name}%`);

    const slug = `${createSlug(values.name)}-${count + 1}`;

    values.slug = slug;

    const { data } = await supabase.from('concert').insert(values).select();

    if (image) {
      const storage = await supabase.storage
        .from('image')
        .upload(`concert/${image.name}-${uuidv4()}`, image);

      const addImage = await supabase
        .from('concert_image')
        .insert({
          concert_id: data[0].id,
          url: process.env.NEXT_PUBLIC_SUPABASE_STORAGE_URL + storage.data.path,
          path: storage.data.path,
        })
        .select();
    } else console.log('Image not FOund');
    // if (!res.ok) toast.error('Something Went Wrong');
    // else router.push('/events');

    router.push('/dashboard')
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
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
