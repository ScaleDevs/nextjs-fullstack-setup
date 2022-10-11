import Head from 'next/head';
import Layout from 'src/layouts/index';
import { trpc } from '@/utils/trpc';

export default function Home() {
  const { isFetching, data } = trpc.useQuery(['health']);

  if (isFetching) return 'loading ...';

  return (
    <Layout>
      <Head>
        <title>Home</title>
        <meta name='description' content='Sample Home page with nextjs' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <br />

      <div className='text-xl font-pacifico text-center'>{data?.status}</div>
    </Layout>
  );
}
