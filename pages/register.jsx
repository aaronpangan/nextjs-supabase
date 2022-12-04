import Layout from '../components/Layout';
import AuthForm from './../components/AuthForm';

const registerSubmit = (values) => {
  console.log('Register SUbmit');
};

const RegisterPage = () => {
  return (
    <Layout>
      <AuthForm
        handleSubmit={registerSubmit}
        initialValues={{
          email: '',
          password: '',
        }}
        submitName="Sign Up"
      />
    </Layout>
  );
};

export default RegisterPage;
