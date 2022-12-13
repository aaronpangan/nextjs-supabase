import { useRouter } from 'next/router';
import AuthForm from '../components/AuthForm';
import Layout from '../components/Layout';
import { loginFormSchema } from '../schemas/auth';
import { useEffect } from 'react';
import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';

const LoginPage = () => {
  const router = useRouter();
  const supabaseClient = useSupabaseClient();

  const loginSubmit = async (values) => {
    const { data, error } = await supabaseClient.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });

    if (data.user === null && data.session === null) {
      console.log('LOGIN FAILED');
      router.push('/');
    }

    console.log('data');
    console.log(data);
    console.log('Error');
    console.log(error);
  };

  return (
    <Layout>
      <AuthForm
        handleSubmit={loginSubmit}
        submitName="Sign In"
        initialValues={{
          email: '',
          password: '',
        }}
        validationSchema={loginFormSchema}
      />
    </Layout>
  );
};

export default LoginPage;

export async function getServerSideProps(ctx) {
  const supabase = createServerSupabaseClient(ctx);
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    };

  return { props: { session } };
}
