import Head from 'next/head';
import LoginForm from '@/modules/login/LoginForm';
import ForceChangePassword from '@/modules/login/ForceChangePassword';
import useAuthStoreTrack from '@/store/auth.store';

export default function Login() {
  const { forceChangePassword } = useAuthStoreTrack();

  return (
    <div>
      <Head>
        <title>Login</title>
        <meta name='description' content='Sample Login page with nextjs' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='w-full h-screen bg-zinc-800 flex flex-row justify-center items-center font-roboto'>
        {forceChangePassword ? <ForceChangePassword /> : <LoginForm />}
      </div>
    </div>
  );
}
