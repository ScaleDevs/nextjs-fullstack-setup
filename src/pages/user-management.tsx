import Head from 'next/head';
import Layout from '@/layouts/index';
import { trpc } from '@/utils/trpc';

function Users() {
  const { mutate } = trpc.useMutation('auth.createUser');

  const createUser = () => {
    mutate();
  };

  return (
    <Layout>
      <Head>
        <title>Home</title>
        <meta name='description' content='Sample Home page with nextjs' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <br />

      <div className='flex flex-col space-y-5'>
        <button className='bg-blue-500' onClick={createUser}>
          Create User
        </button>
      </div>
    </Layout>
  );
}

export default Users;
