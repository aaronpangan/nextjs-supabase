import * as Yup from 'yup';

export const registerFormSchema = Yup.object().shape({
  email: Yup.string()
    .email('Must be Valid Email')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password'), null], 'Passwords must match')
    .required('Password must match'),
});

export const loginFormSchema = Yup.object().shape({
  email: Yup.string()
    .email('Must be Valid Email')
    .required('Email is required'),
  password: Yup.string().required('Password is required'),
});
