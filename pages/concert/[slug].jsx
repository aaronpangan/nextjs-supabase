import Image from 'next/image';
import Link from 'next/link';
import Layout from '../../components/Layout';
import styles from '../../styles/Concert.module.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import {supabase} from '../../config/supabase';
const ConcertPage = ({ concert }) => {
  const router = useRouter();
  async function deleteConcert(e) {}
  return (
    <Layout>
      <div className={styles.concert}>
        <div className={styles.controls}>
          <Link href={`/concert/edit/${concert.id}`}>Edit Concert</Link>

          <a href="#" className={styles.delete} onClick={deleteConcert}>
            Delete Concert
          </a>
        </div>

        <span>
          {new Date(concert.date).toLocaleDateString()} at {concert.time}
        </span>
        <h1>{concert.name}</h1>
        <ToastContainer />
        <div className={styles.image}>
          <Image
            priority={true}
            src={
              concert.concert_image.includes('.jpg')
                ? concert.concert_image.url
                : '/images/event-default.png'
            }
            width={960}
            height={600}
            alt={concert.description}
          />
        </div>

        <h3>Performers:</h3>
        <p>{concert.performers}</p>
        <h3>Description:</h3>
        <p>{concert.description}</p>
        <h3>Venue: {concert.venue}</h3>
        <p>{concert.address}</p>

        <Link href="/concert" className={styles.back}>
          {'<'} Go Back
        </Link>
      </div>
    </Layout>
  );
};

export async function getServerSideProps({ query: { slug } }) {
  const res = await supabase
    .from('concert')
    .select('*, concert_image(id, url) ')
    .eq('slug', slug);
  return { props: { concert: res.data[0] } };
}

export default ConcertPage;
