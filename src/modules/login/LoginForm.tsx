import * as React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import FadeIn from '@/components/FadeIn';
import { trpc } from '@/utils/trpc';
import { ChallengeNameType } from '@aws-sdk/client-cognito-identity-provider';

const schema = z.object({
  username: z.string(),
  password: z.string(),
});

export interface ILoginFormProps {
  setForceChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
  setSession: React.Dispatch<React.SetStateAction<string>>;
  setUsername: React.Dispatch<React.SetStateAction<string>>;
}

export default function LoginForm({ setForceChangePassword, setUsername, setSession }: ILoginFormProps) {
  const { mutate } = trpc.useMutation('auth.signIn');
  const [errMessage, setErrMessage] = React.useState<string | null>(null);

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const login = (formData: typeof schema._input) => {
    mutate(formData, {
      onSuccess(data) {
        console.log(data);
        setErrMessage(null);
        if (data.ChallengeName === ChallengeNameType.NEW_PASSWORD_REQUIRED) {
          setForceChangePassword(true);
          setUsername(formData.username);
          data.Session && setSession(data.Session);
        } else console.log('redirect to dashboard');
      },
      onError(error) {
        console.log('err');
        console.log(error.message);
        setErrMessage('Something went wrong');

        setTimeout(() => {
          setErrMessage(null);
        }, 5000);
      },
    });
  };

  return (
    <div className='bg-zinc-900 p-10 rounded-md text-center w-3/4 md:w-auto'>
      <h1 className='font-roboto text-4xl pb-6'>LOGIN</h1>
      {!!errMessage && (
        <FadeIn>
          <div className='bg-rose-600 rounded-sm p-4 opacity-90 text-center'>{errMessage}</div>
        </FadeIn>
      )}
      <form className='flex flex-col space-y-6 md:w-96' onSubmit={handleSubmit(login)}>
        <input className='p-4 rounded-sm' placeholder='enter email' {...register('username')} />
        <input className='p-4 rounded-sm' placeholder='enter password' {...register('password')} />
        <button
          type='submit'
          className='mt-5 bg-purple-500 p-4 w-full rounded-sm hover:bg-purple-600 transition-colors duration-300'
        >
          LOGIN
        </button>
      </form>
      <h1 className='text-lg font-roboto text-left pt-4'>Forgot Password?</h1>
    </div>
  );
}
