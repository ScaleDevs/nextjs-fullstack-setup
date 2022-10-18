import Head from 'next/head';
import Layout from '@/layouts/index';
import { withPageAuthRequired } from '@auth0/nextjs-auth0';

function Home() {
  return (
    <Layout>
      <Head>
        <title>Home</title>
        <meta name='description' content='Sample Home page with nextjs' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <br />

      <div className='flex flex-col space-y-5'>
        <div className='flex flex-col lg:flex-row w-full'>
          <div className='bg-slate-200 h-64 w-[90%] mx-auto shadow-lg rounded-md lg:h-96 lg:w-[55%]'></div>
          <div className='bg-slate-200 h-64 w-[90%] mt-5 mx-auto shadow-lg rounded-md lg:mt-0 lg:h-96 lg:w-[40%]'></div>
        </div>
        <div className='flex flex-col lg:flex-row w-full mt-5'>
          <div className='bg-slate-200 h-64 w-[90%] mx-auto shadow-lg rounded-md lg:h-96 lg:w-[55%]'></div>
          <div className='bg-slate-200 h-64 w-[90%] mt-5 mx-auto shadow-lg rounded-md lg:mt-0 lg:h-96 lg:w-[40%]'></div>
        </div>
      </div>
    </Layout>
  );
}

export default withPageAuthRequired(Home);
