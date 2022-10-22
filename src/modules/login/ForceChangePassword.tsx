import * as React from 'react';
import z from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import FadeIn from '@/components/FadeIn';
import { trpc } from '@/utils/trpc';

const schema = z.object({
  newPassword: z.string(),
});

export interface IForceChangePasswordProps {
  username: string;
  session: string;
}

export default function ForceChangePassword({ username, session }: IForceChangePasswordProps) {
  const { mutate } = trpc.useMutation('auth.forceChangePassword');
  const [errMessage, setErrMessage] = React.useState<string | null>(null);

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      newPassword: '',
    },
  });

  const forceChangePassword = (formData: typeof schema._input) => {
    mutate(
      { username, newPassword: formData.newPassword, session },
      {
        onSuccess(data) {
          console.log('HERE');
          console.log(data);
        },
        onError(error) {
          console.log('err');
          console.log(error.message);
          setErrMessage('Something went wrong');

          setTimeout(() => {
            setErrMessage(null);
          }, 5000);
        },
      },
    );
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
      <form className='flex flex-col space-y-6 md:w-96' onSubmit={handleSubmit(forceChangePassword)}>
        <input className='p-4 rounded-sm' placeholder='enter new password' {...register('newPassword')} />
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
