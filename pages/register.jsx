import Layout from '../components/Layout';
import { supabase } from '../config/supabase';
import { registerFormSchema } from '../schemas/auth';
import AuthForm from './../components/AuthForm';

const registerSubmit = async (values) => {
  console.log('Register SUbmit');

  const { data, error } = await supabase.auth.signUp({
    email: values.email,
    password: values.password,
  });

  console.log(data);
  console.log(error);
};

const RegisterPage = () => {
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
