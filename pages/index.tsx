import { ReactElement } from 'react';
import Head from 'next/head';
import useSWR from 'swr';

import { getUsers } from 'modules/fe/apirequest';
import Layout from '@/layouts/index';
import useAuthStoreTrack from '@/store/auth.store';

export default function Home() {
  const { data, error } = useSWR(null, getUsers);
  const { isSignedIn, setAuthState } = useAuthStoreTrack();

  const updateIsSignedIn = () => setAuthState('isSignedIn', !isSignedIn);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return (
    <div>
      <Head>
        <title>Home</title>
        <meta name='description' content='Sample Home page with nextjs' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <h1 className='text-center text-4xl text-gray-300 font-bold font-pacifico'>Welcome {data.users[0].firstName}</h1>

      <br />

      <div className='text-xl font-pacifico text-center'>
        Welcome to this Next.js template app. Feel free to navigate through this website.
      </div>

      <br />
      <br />

      <h1 className='text-4xl font-roboto font-bold'>State management store</h1>
      <div className='text-xl font-roboto mt-2'>This stack uses Zustand as its state management store.</div>
      <div className='text-xl font-roboto mt-2'>
        Example: we have an Auth store and a state called isSignedIn. Test it out by updating it and check if the value is
        retained by navigation to another page
      </div>
      <button onClick={updateIsSignedIn} className='bg-blue-900 p-3 rounded-lg hover:cursor-pointer mt-3'>
        update isSignedIn
      </button>

      <div className='text-xl font-roboto mt-3'>value: {`${isSignedIn}`}</div>
    </div>
  );
}

Home.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
