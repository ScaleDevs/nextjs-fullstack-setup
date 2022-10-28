import { useState } from 'react';

import FadeIn from '@/components/FadeIn';
import Loader from '@/components/Loader';
import useLogin from '@/hooks/useLogin.hook';
import IconComp from '@/components/Icon';

export default function LoginForm() {
  const [showPassword, setShowPassword] = useState(false);
  const { errMessage, handleSubmit, signIn, register, isSignInLoading } = useLogin();

  const toggleShowPass = () => setShowPassword((val) => !val);

  return (
    <div className='bg-zinc-900 p-10 rounded-md text-center w-3/4 md:w-auto'>
      <h1 className='font-roboto text-4xl pb-6'>LOGIN</h1>
      {!!errMessage && (
        <>
          <FadeIn>
            <div className='bg-rose-600 rounded-sm p-4 opacity-90 text-center md:w-96 break-words'>{errMessage}</div>
          </FadeIn>
          <br />
        </>
      )}
      <form className='flex flex-col space-y-6 md:w-96' onSubmit={handleSubmit(signIn)}>
        <input className='p-4 rounded-sm' placeholder='enter email' {...register('username')} />
        <div className='w-full relative'>
          <input
            type={showPassword ? 'text' : 'password'}
            className='p-4 rounded-sm w-full'
            placeholder='enter password'
            {...register('password')}
          />
          {showPassword ? (
            <div
              className='absolute right-0 top-0 bottom-0 mt-auto mb-auto pr-1 mr-1 hover:cursor-pointer h-auto flex flex-row items-center'
              onClick={toggleShowPass}
            >
              <IconComp iconName='EyeCloseIcon' iconProps={{}} />
            </div>
          ) : (
            <div
              className='absolute right-0 top-0 bottom-0 mt-auto mb-auto pr-1 mr-1 hover:cursor-pointer h-auto flex flex-row items-center'
              onClick={toggleShowPass}
            >
              <IconComp iconName='EyeOpenIcon' iconProps={{}} />
            </div>
          )}
        </div>
        <button
          type='submit'
          className='mt-5 bg-purple-500 p-4 w-full rounded-sm hover:bg-purple-600 transition-colors duration-300'
        >
          {isSignInLoading ? <Loader /> : 'LOGIN'}
        </button>
      </form>
      <h1 className='text-lg font-roboto text-left pt-4'>Forgot Password?</h1>
    </div>
  );
}
