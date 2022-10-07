import { ReactElement } from 'react';
import Head from 'next/head';
import useSWR from 'swr';

import { getUsers } from '@/services/apirequest';
import Layout from '@/layouts/index';

export default function Home() {
  const { data, error } = useSWR('{ users { name } }', getUsers);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name='description' content='Sample Home page with nextjs' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <h1 className='text-center text-4xl text-gray-300'>Welcome {data.users[0].name}</h1>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
