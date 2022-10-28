import { useState } from 'react';
import Head from 'next/head';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { trpc } from '@/utils/trpc';
import Layout from '@/layouts/index';
import FadeIn from '@/components/FadeIn';

const schema = z.object({
  email: z.string(),
});

function Users() {
  const [errMessage, setErrMessage] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const { mutate } = trpc.useMutation('auth.createUser');

  const { handleSubmit, register } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      email: '',
    },
  });

  const createUser = (formData: typeof schema._input) => {
    mutate(formData.email, {
      onSuccess() {
        setErrMessage(null);
        setSuccessMessage('Invite Sent');
        setTimeout(() => {
          setSuccessMessage(null);
        }, 5000);
      },
      onError(error) {
        console.log('err');
        console.log(error.message);
        if (error.message === 'UsernameExistsException') setErrMessage('Email Already Exist');
        else if (error.message.includes('Invalid email')) setErrMessage('Invalid email');
        else setErrMessage('Something went wrong');

        setTimeout(() => {
          setErrMessage(null);
        }, 5000);
      },
    });
  };

  return (
    <Layout>
      <Head>
        <title>Home</title>
        <meta name='description' content='Sample Home page with nextjs' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <br />

      <div className='w-1/2 flex flex-row space-x-3'>
        <button className='bg-slate-200 py-4 px-8 rounded-t-sm '>INVITE USER</button>
        <button className='bg-slate-200 py-4 px-8 rounded-t-sm '>LIST USERS</button>
      </div>

      <div className='bg-slate-200 w-1/2 p-5 rounded-sm shadow-lg'>
        {!!errMessage && (
          <FadeIn>
            <div className='bg-rose-600 rounded-sm p-4 opacity-90 text-center'>{errMessage}</div>
          </FadeIn>
        )}
        {!!successMessage && (
          <FadeIn>
            <div className='bg-green-600 rounded-sm p-4 opacity-90 text-center'>{successMessage}</div>
          </FadeIn>
        )}
        <h1 className='font-roboto text-2xl py-5'>INVITE A USER</h1>
        <form className='flex flex-col space-y-5' onSubmit={handleSubmit(createUser)}>
          <input className='p-4 rounded-sm' placeholder='enter email' {...register('email')} />
          <button type='submit' className='bg-purple-500 p-4 rounded-sm hover:bg-purple-600 transition-colors duration-300'>
            SEND
          </button>
        </form>
      </div>
    </Layout>
  );
}

export default Users;
