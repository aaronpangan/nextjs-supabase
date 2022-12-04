import AuthForm from '../components/AuthForm';
import Layout from '../components/Layout';

const LoginPage = () => {
  const loginSubmit = (values) => {
    console.log('Login SUbmit');
  };

  return (
    <Layout>
      <AuthForm
        handleSubmit={loginSubmit}
        initialValues={{
          email: '',
          password: '',
          confirmPassword: undefined,

        }}
        submitName='Sign In'
      />
    </Layout>
  );
};

export default LoginPage;
