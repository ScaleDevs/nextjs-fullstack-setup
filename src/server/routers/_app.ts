import superjson from 'superjson';
import { createRouter } from '../createRouter';
import { authRouter } from './auth.router';
import { productRouter } from './product.router';

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
  .merge('auth.', authRouter)
  .merge('product.', productRouter);

export type AppRouter = typeof appRouter;
