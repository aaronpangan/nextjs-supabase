import styles from '../styles/AuthForm.module.css';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

import { Form, Formik, Field, ErrorMessage } from 'formik';

const AuthForm = ({
  handleSubmit,
  initialValues,
  submitName,
  validationSchema,
}) => {
  const supabaseClient = useSupabaseClient();

  const handleSocialLogin = async () => {
    console.log('GOOGLE');
    const { data, error } = await supabaseClient.auth.signInWithOAuth({
      provider: 'google',
    });
  };

  return (
    <div className={styles.auth}>
      <h1>{submitName}</h1>
      <Formik
        initialValues={initialValues}
        onSubmit={handleSubmit}
        validationSchema={validationSchema}
        // validateOnBlur={false}
        // validateOnChange={false}
      >
        {({ isSubmitting }) => (
          <Form>
            <div>
              <label htmlFor="email">Email</label>

              <Field type="email" id="email" name="email" />

              <ErrorMessage
                name="email"
                component="div"
                className={styles.error}
              />
            </div>

            <div>
              <label htmlFor="email">Password</label>

              <Field type="password" id="password" name="password" />

              <ErrorMessage
                name="password"
                component="div"
                className={styles.error}
              />
            </div>

            {submitName === 'Sign Up' ? (
              <div>
                <label htmlFor="confirmPassword">Confirm Password</label>

                <Field
                  type="password"
                  id="confirmPassword"
                  name="confirmPassword"
                />

                <ErrorMessage
                  name="confirmPassword"
                  component="div"
                  className={styles.error}
                />
              </div>
            ) : null}

            <button type="submit" className="btn" disabled={isSubmitting}>
              {submitName}
            </button>
          </Form>
        )}
      </Formik>

      <div className={styles.space}>OR</div>

      <button
        className={`btn ${styles.social_login}`}
        onClick={handleSocialLogin}
      >
        {`${submitName} with Google`}
      </button>
    </div>
  );
};

export default AuthForm;
