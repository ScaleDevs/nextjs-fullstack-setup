import * as React from 'react';
import Head from 'next/head';
import Layout from '@/layouts/index';

export interface ILoginProps {}

export default function Login() {
  return (
    <Layout>
      <Head>
        <title>Login</title>
        <meta name='description' content='Sample Login page with nextjs' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <br />

      <div className='flex flex-col space-y-5'>login</div>
    </Layout>
  );
}
