import { useRouter } from 'next/router';
import { BroadcastChannel } from 'broadcast-channel';
import useAuthStoreTrack, { AuthStates } from '@/store/auth.store';
import { isPublicRoute } from '@/utils/helper';

export declare type Message = { action: 'LOGIN' | 'LOGOUT'; data?: string };
const options = { webWorkerSupport: true };
const channel: BroadcastChannel<Message> = new BroadcastChannel('authChannel', options);

export function useSyncTabs() {
  const router = useRouter();
  const { setAuthState, setWholeAuthState, resetAuthState, getAuthStates } = useAuthStoreTrack();

  const initiateAuthChannel = () => {
    channel.onmessage = (msg: { action: 'LOGIN' | 'LOGOUT'; data?: string }) => {
      console.log('AUTHCHANNEL - LISTENER', msg.action);
      if (msg.action === 'LOGIN' && msg.data) {
        setAuthState('authLoader', true);

        const authStates = JSON.parse(msg.data) as Omit<AuthStates, 'setAuthState' | 'resetAuthState' | 'setWholeAuthState'>;

        setWholeAuthState({ ...authStates });

        if (isPublicRoute(router.pathname)) router.push({ pathname: '/' });

        setAuthState('authLoader', false);
      } else if (msg.action === 'LOGOUT') {
        resetAuthState();
        if (!isPublicRoute(router.pathname)) router.push({ pathname: '/login' });
      }
    };
  };

  const loginAllTabs = () => {
    console.log('AUTHCHANNEL - LOGIN SENDER');
    channel.postMessage({ action: 'LOGIN', data: JSON.stringify(getAuthStates()) });
  };

  const logoutAllTabs = () => {
    console.log('AUTHCHANNEL - LOGOUT SENDER');
    channel?.postMessage({
      action: 'LOGOUT',
    });
  };

  return {
    signOut: true,
    initiateAuthChannel,
    loginAllTabs,
    logoutAllTabs,
  };
}
