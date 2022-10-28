import create, { StateCreator } from 'zustand';
import { createTrackedSelector } from 'react-tracked';
import { devtools } from 'zustand/middleware';

export type AuthStates = {
  authLoader: boolean;

  userId: string | null;

  username: string | null;

  session: string | null;

  forceChangePassword: boolean;

  idToken: string | null;

  accessToken: string | null;

  expiresIn: number | null;

  expiresAt: number | null;

  refreshTokenJobInterval: NodeJS.Timer | void;

  getAuthStates: () => Omit<AuthStates, 'setAuthState' | 'resetAuthState' | 'setWholeAuthState' | 'refreshTokenJobInterval'>;

  setAuthState: (label: keyof Omit<AuthStates, 'setAuthState' | 'resetAuthState' | 'setWholeAuthState'>, value: any) => void;

  setWholeAuthState: (authStates: Omit<AuthStates, 'setAuthState' | 'resetAuthState' | 'setWholeAuthState'>) => void;

  resetAuthState: () => void;
};

const initState: Omit<AuthStates, 'setAuthState' | 'resetAuthState' | 'setWholeAuthState' | 'authLoader' | 'getAuthStates'> = {
  username: null,

  session: null,

  userId: null,

  idToken: null,

  accessToken: null,

  expiresIn: null,

  expiresAt: null,

  refreshTokenJobInterval: undefined,

  forceChangePassword: false,
};

const stateStore = devtools((set, get) => ({
  ...initState,

  authLoader: true,

  getAuthStates: () => {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { setAuthState, setWholeAuthState, resetAuthState, refreshTokenJobInterval, ...newAuthStates } = get();

    return newAuthStates;
  },

  setAuthState: (label, value) => set({ [`${label}`]: value }),

  setWholeAuthState: (authStates) => set((current) => ({ ...current, ...authStates })),

  resetAuthState: () => set({ ...initState }),
})) as StateCreator<AuthStates, [], [], AuthStates>;

export const useAuthStore = create<AuthStates>(stateStore);

const useAuthStoreTrack = createTrackedSelector(useAuthStore);

export default useAuthStoreTrack;
