import { ReactElement } from 'react';
import Head from 'next/head';

import useAuthStoreTrack from '@/store/auth.store';
import Layout from '@/layouts/index';

export interface IAboutProps {}

export default function About() {
  const { isSignedIn, setAuthState } = useAuthStoreTrack();

  const updateIsSignedIn = () => setAuthState('isSignedIn', !isSignedIn);

  return (
    <div>
      <Head>
        <title>About</title>
        <meta name='description' content='Sample Home page with nextjs' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <h1 className='text-center text-4xl text-gray-300 font-bold font-pacifico'>About Us</h1>

      <br />

      <div className='text-xl font-pacifico text-center'>
        This is a Next.js template and can be used in small to medium size apps not needing micro service architecture.
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

About.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
