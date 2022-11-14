import Image from 'next/image';
import Link from 'next/link';
import styles from '../styles/ConcertItem.module.css';
const ConcertItem = ({ concert }) => {
  return (
    <div className={styles.concert}>
      <div className={styles.img}>
        <Image
          src={
            concert.concert_image.includes(".jpg")
              ? concert.concert_image.url
              : '/images/event-default.png'
          }
          width={170}
          height={100}
          alt={concert.description}
        />
      </div>
      <div className={styles.info}>
        <span>
          {new Date(concert.date).toLocaleDateString()} at {concert.time}
        </span>
        <h3>{concert.name}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`/concert/${concert.slug}`} className="btn">
       Details
        </Link>
      </div>
    </div>
  );
};

export default ConcertItem;
