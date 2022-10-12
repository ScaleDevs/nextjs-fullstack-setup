import create, { StateCreator } from 'zustand';
import { createTrackedSelector } from 'react-tracked';
import { devtools } from 'zustand/middleware';

export type AppStates = {
  sideNavOpen: boolean;

  setAppState: (label: keyof Omit<AppStates, 'setAppState' | 'resetAppState' | 'setWholeAppState'>, value: any) => void;

  setWholeAppState: (appStates: Omit<AppStates, 'setAppState' | 'resetAppState' | 'setWholeAppState'>) => void;

  resetAppState: () => void;
};

const initState: Omit<AppStates, 'setAppState' | 'resetAppState' | 'setWholeAppState'> = {
  sideNavOpen: true,
};

const stateStore = devtools((set) => ({
  ...initState,

  setAppState: (label, value) => set({ [`${label}`]: value }),

  setWholeAppState: (appStates) => set((current) => ({ ...current, ...appStates })),

  resetAppState: () => set({ ...initState }),
})) as StateCreator<AppStates, [], [], AppStates>;

export const useAppStore = create<AppStates>(stateStore);

const useAppStoreTrack = createTrackedSelector(useAppStore);

export default useAppStoreTrack;
