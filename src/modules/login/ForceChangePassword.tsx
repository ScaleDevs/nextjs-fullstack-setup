import { useState } from 'react';
import { useRouter } from 'next/router';
import z from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { FiEye, FiEyeOff } from 'react-icons/fi';

import FadeIn from '@/components/FadeIn';
import { trpc } from '@/utils/trpc';
import { RegexValidations } from '@/utils/helper';
import useAuthStoreTrack from '@/store/auth.store';

const schema = z.object({
  newPassword: z.string(),
});

export interface IForceChangePasswordProps {
  username: string;
  session: string;
  setForceChangePassword: React.Dispatch<React.SetStateAction<boolean>>;
}

export default function ForceChangePassword({ username, session, setForceChangePassword }: IForceChangePasswordProps) {
  const router = useRouter();
  const { mutate } = trpc.useMutation('auth.forceChangePassword');
  const { setAuthState } = useAuthStoreTrack();
  const [errMessage, setErrMessage] = useState<string | null>(null);
  const [showPassword, setShowPassword] = useState(false);
  const [passMinCharLength, setPassMinCharLength] = useState(false);
  const [passNum, setPassNum] = useState(false);
  const [passLowCase, setPassLowCase] = useState(false);
  const [passUpCase, setPassUpCase] = useState(false);
  const [passSpecialChar, setPassSpecialChar] = useState(false);
  const [conditionsPassed, setConditionsPassed] = useState(0);
  const colorTransitionCss = 'transition-colors duration-200';

  const pwdReqItemCss = (isPassed: boolean) => colorTransitionCss + ' ' + (isPassed ? 'text-green-400' : '');

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      newPassword: '',
    },
  });

  const toggleShowPass = () => setShowPassword((val) => !val);

  const onPasswordValidation = (e: any) => {
    const newValue: string = e.target.value;

    if (newValue.length >= 8 && !passMinCharLength) {
      setPassMinCharLength(true);
      setConditionsPassed((i) => i + 1);
    } else if (!(newValue.length >= 8) && passMinCharLength) {
      setPassMinCharLength(false);
      setConditionsPassed((i) => i - 1);
    }

    if (RegexValidations.hasNumber.exec(newValue) && !passNum) {
      setPassNum(true);
      setConditionsPassed((i) => i + 1);
    } else if (!RegexValidations.hasNumber.exec(newValue) && passNum) {
      setPassNum(false);
      setConditionsPassed((i) => i - 1);
    }

    if (RegexValidations.hasLowerCase.exec(newValue) && !passLowCase) {
      setPassLowCase(true);
      setConditionsPassed((i) => i + 1);
    } else if (!RegexValidations.hasLowerCase.exec(newValue) && passLowCase) {
      setPassLowCase(false);
      setConditionsPassed((i) => i - 1);
    }

    if (RegexValidations.hasUpperCase.exec(newValue) && !passUpCase) {
      setPassUpCase(true);
      setConditionsPassed((i) => i + 1);
    } else if (!RegexValidations.hasUpperCase.exec(newValue) && passUpCase) {
      setPassUpCase(false);
      setConditionsPassed((i) => i - 1);
    }

    if (RegexValidations.hasSpecialChar.exec(newValue) && !passSpecialChar) {
      setPassSpecialChar(true);
      setConditionsPassed((i) => i + 1);
    } else if (!RegexValidations.hasSpecialChar.exec(newValue) && passSpecialChar) {
      setPassSpecialChar(false);
      setConditionsPassed((i) => i - 1);
    }
  };

  const forceChangePassword = (formData: typeof schema._input) => {
    if (conditionsPassed < 5) {
      setErrMessage('Password does not meet requirements');
      setTimeout(() => {
        setErrMessage(null);
      }, 5000);
      return;
    }

    mutate(
      { username, newPassword: formData.newPassword, session },
      {
        onSuccess(data) {
          setAuthState('accessToken', data?.AuthenticationResult?.AccessToken);
          setAuthState('idToken', data?.AuthenticationResult?.IdToken);
          setAuthState('expiresIn', data?.AuthenticationResult?.ExpiresIn);
          setAuthState('expiresIn', data?.AuthenticationResult?.ExpiresIn);
          router.push('/');
        },
        onError(error) {
          if (error.message.includes('Invalid Session')) setErrMessage('Invalid Session, kindly login again');
          else setErrMessage(error.message);

          setTimeout(() => {
            setErrMessage(null);
          }, 5000);
        },
      },
    );
  };

  return (
    <div className='bg-zinc-900 p-10 rounded-md text-center w-3/4 md:w-[500px]'>
      <h1 className='font-roboto text-3xl pb-6'>CHANGE PASSWORD</h1>
      {!!errMessage && (
        <>
          <FadeIn>
            <div className='bg-rose-600 rounded-sm p-4 opacity-90 text-center'>{errMessage}</div>
          </FadeIn>
          <br />
        </>
      )}
      <form className='flex flex-col space-y-6 md:w-full' onSubmit={handleSubmit(forceChangePassword)}>
        <h1 className='text-center font-roboto text-xl'>You are required to change your password</h1>
        <div className='w-full relative'>
          <input
            type={showPassword ? 'text' : 'password'}
            className='p-4 rounded-sm w-full'
            placeholder='enter new password'
            {...register('newPassword')}
            onChange={onPasswordValidation}
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
        <div>
          <h1 className='text-lg text-left font-raleway font-medium pb-2'>Password Requirements:</h1>
          <ul className='text-left list-disc pl-5 font-raleway font-normal space-y-1'>
            <li className={pwdReqItemCss(passMinCharLength)}>Password minimum length 8 characters</li>
            <li className={pwdReqItemCss(passNum)}>Contains at least 1 number</li>
            <li className={pwdReqItemCss(passSpecialChar)}>Contains at least 1 special character</li>
            <li className={pwdReqItemCss(passUpCase)}>Contains at least 1 uppercase letter</li>
            <li className={pwdReqItemCss(passLowCase)}>Contains at least 1 lowercase letter</li>
          </ul>
        </div>

        <button
          type='submit'
          className='mt-5 bg-purple-500 p-4 w-full rounded-sm hover:bg-purple-600 transition-colors duration-300'
        >
          SUBMIT
        </button>
      </form>
      <h1
        className='text-lg font-roboto text-left pt-4 hover:cursor-pointer hover:text-purple-500 transition-colors duration-200'
        onClick={() => setForceChangePassword(false)}
      >
        Back To Login
      </h1>
    </div>
  );
}
