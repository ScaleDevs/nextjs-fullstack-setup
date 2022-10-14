import * as React from 'react';
import Head from 'next/head';
import { trpc } from '@/utils/trpc';

export interface ILoginProps {}

export default function Login() {
  const { data, mutate } = trpc.useMutation(['auth.signIn']);

  const signIn = async () => {
    console.log('SIGIN LOG');
    mutate({ username: 'mbutalid1', password: 'admin123' });
    console.log(data);
  };

  return (
    <div>
      <Head>
        <title>Login</title>
        <meta name='description' content='Sample Login page with nextjs' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='w-full h-screen bg-zinc-800 flex flex-row justify-center items-center font-roboto'>
        <div className='bg-zinc-900 p-7 rounded-md text-center'>
          <h1 className='text-3xl mt-'>LOGIN</h1>

          <h2 className='mt-3 text-gray-500 text-lg'>Please enter you username and password</h2>

          <div className='mt-3 flex flex-col space-y-4'>
            <input type='text' placeholder='username' className='rounded-sm p-4' />
            <input type='password' placeholder='password' className='rounded-sm p-4' />
          </div>

          <button
            className='mt-5 bg-purple-500 p-4 w-full rounded-sm hover:bg-purple-600 transition-colors duration-300'
            onClick={signIn}
          >
            LOGIN
          </button>
          <h2 className='mt-5 text-gray-500 text-lg hover:cursor-pointer hover:text-gray-400'>forget password?</h2>
        </div>
      </div>
    </div>
  );
}
