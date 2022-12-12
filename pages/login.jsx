import { useRouter } from 'next/router';
import AuthForm from '../components/AuthForm';
import Layout from '../components/Layout';
import { supabase } from '../config/supabase';
import { loginFormSchema } from '../schemas/auth';

const LoginPage = () => {
  const router = useRouter();

  const loginSubmit = async (values) => {
    const { data, error } = await supabase.auth.signInWithPassword({
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
