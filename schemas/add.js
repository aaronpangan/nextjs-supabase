import * as Yup from 'yup';

export const concertFormSchema = Yup.object().shape({
  name: Yup.string().required("Name is required"),
  performers: Yup.string().required('Performers is required'),
  venue: Yup.string().required('Venue is required'),
  address: Yup.string().required('Address is required'),
  date: Yup.date().required('Date is required'),
  time: Yup.string().required('Time is required'),
  description: Yup.string().required('Description is required'),
});
