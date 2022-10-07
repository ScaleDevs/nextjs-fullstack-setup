import { ReactElement } from 'react';
import Head from 'next/head';

import Layout from '@/layouts/index';

export interface IAboutProps {}

export default function About() {
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
    </div>
  );
}

About.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};
