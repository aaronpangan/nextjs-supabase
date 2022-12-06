import Layout from '../components/Layout';
import { registerFormSchema } from '../schemas/auth';
import AuthForm from './../components/AuthForm';

const registerSubmit = (values) => {
  console.log(values);
  console.log('Register SUbmit');
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
