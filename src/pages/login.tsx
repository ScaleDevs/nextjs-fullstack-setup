import { useState } from 'react';
import Head from 'next/head';
import LoginForm from '@/modules/login/LoginForm';
import ForceChangePassword from '@/modules/login/ForceChangePassword';

export default function Login() {
  const [forceChangePassword, setForceChangePassword] = useState(false);
  const [session, setSession] = useState<string>('');
  const [username, setUsername] = useState('');

  return (
    <div>
      <Head>
        <title>Login</title>
        <meta name='description' content='Sample Login page with nextjs' />
        <link rel='icon' href='/favicon.ico' />
      </Head>

      <div className='w-full h-screen bg-zinc-800 flex flex-row justify-center items-center font-roboto'>
        {forceChangePassword ? (
          <ForceChangePassword username={username} session={session} setForceChangePassword={setForceChangePassword} />
        ) : (
          <LoginForm setForceChangePassword={setForceChangePassword} setUsername={setUsername} setSession={setSession} />
        )}
      </div>
    </div>
  );
}
