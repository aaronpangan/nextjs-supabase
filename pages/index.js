import Head from 'next/head';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import supabase from '../supabase';

export default function Home(props) {
  return <div className={styles.container}></div>;
}

export async function getServerSideProps() {
  const res = await supabase.from('concert').select('*');

  console.log(res.data);

  return { props: res };
}
