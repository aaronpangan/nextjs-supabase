import Layout from '../components/Layout';
import { registerFormSchema } from '../schemas/auth';
import AuthForm from './../components/AuthForm';
import { createServerSupabaseClient } from '@supabase/auth-helpers-nextjs';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

const RegisterPage = () => {
  const supabaseClient = useSupabaseClient();

  const registerSubmit = async (values) => {
    console.log('Register SUbmit');

    const { data, error } = await supabaseClient.auth.signUp({
      email: values.email,
      password: values.password,
    });
  };

  return (
    <Layout>
      <AuthForm
        handleSubmit={registerSubmit}
        submitName="Sign Up"
        initialValues={{
          email: '',
          password: '',
          confirmPassword: '',
        }}
        validationSchema={registerFormSchema}
      />
    </Layout>
  );
};

export default RegisterPage;

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
