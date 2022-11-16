import { Form, Formik, Field, ErrorMessage } from 'formik';
import Link from 'next/link';
import { useRouter } from 'next/router';
import styles from '../styles/Form.module.css';
import { concertFormSchema } from '../schemas/add';

function FormConcert({ handleSubmit, formInitValues, buttonName }) {
  return (
    <Formik
      initialValues={
        formInitValues
          ? formInitValues
          : {
              name: '',
              performers: '',
              venue: '',
              address: '',
              date: new Date().toISOString().slice(0, 10),
              time: '',
              description: '',
            }
      }
      validationSchema={concertFormSchema}
      onSubmit={handleSubmit}
      validateOnBlur={false}
      validateOnChange={false}
    >
      {({ isSubmitting }) => (
        <Form className={styles.form}>
          <div className={styles.grid}>
            <div>
              <label htmlFor="name">Event Name</label>

              <Field
                type="text"
                id="name"
                name="name"
                className={styles.text}
              />

              <ErrorMessage
                name="name"
                component="div"
                className={styles.error}
              />
            </div>

            <div>
              <label htmlFor="performers">Performers</label>
              <Field type="text" name="performers" id="performers" />
              <ErrorMessage
                name="performers"
                component="div"
                className={styles.error}
              />
            </div>

            <div>
              <label htmlFor="venue">Venue</label>
              <Field type="text" name="venue" id="venue" />
              <ErrorMessage
                name="venue"
                component="div"
                className={styles.error}
              />
            </div>

            <div>
              <label htmlFor="address">Address</label>
              <Field type="text" name="address" id="address" />
              <ErrorMessage
                name="address"
                component="div"
                className={styles.error}
              />
            </div>
            <div>
              <label htmlFor="date">Date</label>
              <Field
                type="date"
                name="date"
                id="date"
                min={new Date().toISOString().slice(0, 10)}
              />
              <ErrorMessage
                name="date"
                component="div"
                className={styles.error}
              />
            </div>
            <div>
              <label htmlFor="time">Time</label>
              <Field type="text" name="time" id="time" />
              <ErrorMessage
                name="time"
                component="div"
                className={styles.error}
              />
            </div>
          </div>
          <div>
            <label htmlFor="description">Event Description</label>

            <Field as="textarea" name="description" id="description" />
            <ErrorMessage
              name="description"
              component="div"
              className={styles.error}
            />
          </div>
          <button type="submit" className="btn" disabled={isSubmitting}>
            {buttonName}
          </button>
        </Form>
      )}
    </Formik>
  );
}

export default FormConcert;
