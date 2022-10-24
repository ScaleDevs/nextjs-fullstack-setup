import { useState, Dispatch, SetStateAction } from 'react';
import { useRouter } from 'next/router';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { FiEyeOff, FiEye } from 'react-icons/fi';
import { ChallengeNameType } from '@aws-sdk/client-cognito-identity-provider';

import FadeIn from '@/components/FadeIn';
import Loader from '@/components/Loader';
import { trpc } from '@/utils/trpc';
import useAuthStoreTrack from '@/store/auth.store';

const schema = z.object({
  username: z.string(),
  password: z.string(),
});

export interface ILoginFormProps {
  setForceChangePassword: Dispatch<SetStateAction<boolean>>;
  setSession: Dispatch<SetStateAction<string>>;
  setUsername: Dispatch<SetStateAction<string>>;
}

export default function LoginForm({ setForceChangePassword, setUsername, setSession }: ILoginFormProps) {
  const router = useRouter();
  const { mutate, isLoading } = trpc.useMutation('auth.signIn');
  const { setAuthState } = useAuthStoreTrack();
  const [errMessage, setErrMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const toggleShowPass = () => setShowPassword((val) => !val);

  const login = (formData: typeof schema._input) => {
    mutate(formData, {
      onSuccess(data) {
        console.log(data);
        setErrMessage(null);
        if (data?.ChallengeName === ChallengeNameType.NEW_PASSWORD_REQUIRED) {
          setForceChangePassword(true);
          setUsername(formData.username);
          data.Session && setSession(data.Session);
        } else {
          setAuthState('accessToken', data?.AuthenticationResult?.AccessToken);
          setAuthState('idToken', data?.AuthenticationResult?.IdToken);
          setAuthState('expiresIn', data?.AuthenticationResult?.ExpiresIn);
          setAuthState('expiresIn', data?.AuthenticationResult?.ExpiresIn);
          router.push('/');
        }
      },
      onError(error) {
        setErrMessage(error.message);

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
        <>
          <FadeIn>
            <div className='bg-rose-600 rounded-sm p-4 opacity-90 text-center'>{errMessage}</div>
          </FadeIn>
          <br />
        </>
      )}
      <form className='flex flex-col space-y-6 md:w-96' onSubmit={handleSubmit(login)}>
        <input className='p-4 rounded-sm' placeholder='enter email' {...register('username')} />
        <div className='w-full relative'>
          <input
            type={showPassword ? 'text' : 'password'}
            className='p-4 rounded-sm w-full'
            placeholder='enter password'
            {...register('password')}
          />
          {showPassword ? (
            <FiEyeOff
              className='absolute right-0 top-0 bottom-0 mt-auto mb-auto pr-1 mr-1 hover:cursor-pointer'
              size={30}
              onClick={toggleShowPass}
            />
          ) : (
            <FiEye
              className='absolute right-0 top-0 bottom-0 mt-auto mb-auto pr-1 mr-1 hover:cursor-pointer'
              size={30}
              onClick={toggleShowPass}
            />
          )}
        </div>
        <button
          type='submit'
          className='mt-5 bg-purple-500 p-4 w-full rounded-sm hover:bg-purple-600 transition-colors duration-300'
        >
          {isLoading ? <Loader /> : 'LOGIN'}
        </button>
      </form>
      <h1 className='text-lg font-roboto text-left pt-4'>Forgot Password?</h1>
    </div>
  );
}
