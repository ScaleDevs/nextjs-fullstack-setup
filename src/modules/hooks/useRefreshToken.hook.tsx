import { useState } from 'react';
import { useRouter } from 'next/router';
import useAuthStoreTrack from '@/store/auth.store';
import { InitiateAuthCommandOutput } from '@aws-sdk/client-cognito-identity-provider';
import { trpc } from '@/utils/trpc';
import { publicRoutes } from '@/utils/helper';

export default function useRefreshToken() {
  const router = useRouter();
  const { setAuthState, resetAuthState, authLoader } = useAuthStoreTrack();
  const [errMessage, setErrMessage] = useState<string | null>(null);
  const { mutate, isSuccess, isError, data } = trpc.useMutation('auth.refreshToken', {
    onSuccess(data) {
      setErrMessage(null);
      if (data) updateAuthStates(data);
    },
    onError(error) {
      setErrMessage(error.message);

      setTimeout(() => {
        setErrMessage(null);
      }, 5000);

      resetAuthState();
      setAuthState('authLoader', false);

      router.push(publicRoutes['/login']);
    },
  });

  const updateAuthStates = (data: InitiateAuthCommandOutput & { expiresAt: number }) => {
    setAuthState('accessToken', data?.AuthenticationResult?.AccessToken);
    setAuthState('idToken', data?.AuthenticationResult?.IdToken);
    setAuthState('expiresIn', data?.AuthenticationResult?.ExpiresIn);
    setAuthState('expiresAt', data.expiresAt);
    setAuthState('authLoader', false);
    if (!publicRoutes[router.pathname as keyof typeof publicRoutes]) return;
    else router.push(publicRoutes['/login']);
  };

  const refreshAccessToken = () => mutate();

  return {
    isLoading: authLoader,
    isSuccess,
    isError,
    data,
    errMessage,
    updateAuthStates,
    refreshAccessToken,
  };
}
