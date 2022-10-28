import { useState } from 'react';
import { useRouter } from 'next/router';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { ChallengeNameType, InitiateAuthCommandOutput } from '@aws-sdk/client-cognito-identity-provider';
import { zodResolver } from '@hookform/resolvers/zod';
import useAuthStoreTrack from '@/store/auth.store';
import { trpc } from '@/utils/trpc';
import { useSyncTabs } from './useSyncTabs';

const schema = z.object({
  username: z.string(),
  password: z.string(),
});

export default function useLogin() {
  const router = useRouter();
  const { setAuthState } = useAuthStoreTrack();
  const [errMessage, setErrMessage] = useState<string | null>(null);
  const { mutate, isLoading: isSignInLoading } = trpc.useMutation('auth.signIn');
  const { loginAllTabs } = useSyncTabs();

  const { register, handleSubmit } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      username: '',
      password: '',
    },
  });

  const updateAuthStates = (data: InitiateAuthCommandOutput & { expiresAt: number }) => {
    setAuthState('accessToken', data?.AuthenticationResult?.AccessToken);
    setAuthState('idToken', data?.AuthenticationResult?.IdToken);
    setAuthState('expiresIn', data?.AuthenticationResult?.ExpiresIn);
    setAuthState('expiresAt', data.expiresAt);
    router.push('/');
    loginAllTabs();
  };

  const signIn = (formData: typeof schema._input) => {
    mutate(formData, {
      onSuccess(data) {
        setErrMessage(null);
        if (data?.ChallengeName === ChallengeNameType.NEW_PASSWORD_REQUIRED) {
          setAuthState('forceChangePassword', true);
          setAuthState('username', formData.username);
          data.Session && setAuthState('session', data.Session);
        } else if (data) updateAuthStates(data);
      },
      onError(error) {
        setErrMessage(error.message);

        setTimeout(() => {
          setErrMessage(null);
        }, 5000);
      },
    });
  };

  return {
    isSignInLoading,
    errMessage,
    handleSubmit,
    register,
    signIn,
    updateAuthStates,
  };
}
