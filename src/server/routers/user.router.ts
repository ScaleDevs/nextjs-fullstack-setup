import { createRouter } from '../createRouter';
import { authMiddleware } from '../util';

export const userRouter = createRouter()
  .middleware(authMiddleware)
  .query('hi', {
    async resolve() {
      try {
        return 'hi';
      } catch (err) {
        return false;
      }
    },
  });
