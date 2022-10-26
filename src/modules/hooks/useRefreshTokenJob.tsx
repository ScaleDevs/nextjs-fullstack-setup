import useAuthStoreTrack from '@/store/auth.store';
import useRefreshToken from './useRefreshToken.hook';

export function useRefreshTokenJob() {
  const { setAuthState, refreshTokenJobInterval, expiresIn } = useAuthStoreTrack();
  const { refreshAccessToken } = useRefreshToken();

  const runRefreshTokenJob = () => {
    if (!refreshTokenJobInterval && expiresIn) {
      console.log('RUN REFRESH JOB');
      const intervalInstance = setInterval(() => {
        console.log('TRIGGER');
        refreshAccessToken();
      }, expiresIn * 1000 * 0.8);

      setAuthState('refreshTokenJobInterval', intervalInstance);
    }
  };

  const clearRefreshTokenJob = () => {
    console.log('clearRefreshTokenJob', refreshTokenJobInterval);
    if (refreshTokenJobInterval) setAuthState('refreshTokenJobInterval', clearInterval(refreshTokenJobInterval));
  };

  return {
    runRefreshTokenJob,
    clearRefreshTokenJob,
  };
}
