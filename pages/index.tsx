import Head from 'next/head';
import useSWR from 'swr';
import styles from '@/styles/Home.module.css';
import { getUsers } from '@/services/apirequest';

export default function Home() {
  const { data, error } = useSWR('{ users { name } }', getUsers);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div className={styles.container}>
      <Head>
        <title>Home</title>
        <meta name='description' content='Sample Home page with nextjs' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div>HERE: {data.users[0].name}</div>
    </div>
  );
}
