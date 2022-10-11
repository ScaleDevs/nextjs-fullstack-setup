import { createRouter } from '../createRouter';
import { userRouter } from './user';
import superjson from 'superjson';

/**
 * Create your application's root router
 * If you want to use SSG, you need export this
 * @link https://trpc.io/docs/ssg
 * @link https://trpc.io/docs/router
 */
export const appRouter = createRouter()
  .transformer(superjson)
  .query('health', {
    resolve() {
      return {
        code: 200,
        status: 'healthy',
      };
    },
  })
  .merge('user.', userRouter);

export type AppRouter = typeof appRouter;
