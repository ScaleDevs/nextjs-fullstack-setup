import * as trpcNext from '@trpc/server/adapters/next';
import { AppRouter, appRouter } from '@/server/routers/_app';
import { createContext } from '@/server/createContext';

export default trpcNext.createNextApiHandler<AppRouter>({
  router: appRouter,

  createContext,

  onError({ error }) {
    if (error.code === 'INTERNAL_SERVER_ERROR') {
      // send to bug reporting
      console.error('Something went wrong', error);
    }
  },

  batching: {
    enabled: true,
  },
});
