import { useEffect } from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { useUser } from '@auth0/nextjs-auth0';
import Loader from '@/components/Loader';

export interface ILoginProps {}

export default function Login() {
  const { user, isLoading } = useUser();
  const router = useRouter();

  const signIn = async () => {
    router.push('/api/auth/login');
  };

  useEffect(() => {
    if (user) router.push('/');
  }, [router, user]);

  return (
    <div>
      <Head>
        <title>Login</title>
        <meta name='description' content='Sample Login page with nextjs' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='w-full h-screen bg-zinc-800 flex flex-row justify-center items-center font-roboto'>
        <div className='bg-zinc-900 p-7 rounded-md text-center'>
          {isLoading ? (
            <Loader />
          ) : (
            <>
              <h2 className='mt-3 text-gray-500 text-lg'>You are required to login to access the system</h2>

              <button
                className='mt-5 bg-purple-500 p-4 w-full rounded-sm hover:bg-purple-600 transition-colors duration-300'
                onClick={signIn}
              >
                LOGIN
              </button>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
