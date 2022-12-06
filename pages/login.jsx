import AuthForm from '../components/AuthForm';
import Layout from '../components/Layout';
import { supabase } from '../config/supabase';
import { loginFormSchema } from '../schemas/auth';

const LoginPage = () => {
  const loginSubmit = (values) => {
    console.log(values);
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
