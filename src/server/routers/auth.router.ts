import { z } from 'zod';
import { deleteCookie, getCookie } from 'cookies-next';

import { createRouter } from '../createRouter';
import { AuthService } from '@/svc/auth.service';

export const authRouter = createRouter()
  .mutation('createUser', {
    input: z.string().email(),
    resolve({ input }) {
      return AuthService.createUser(input);
    },
  })
  .mutation('signIn', {
    input: z.object({
      username: z.string().email(),
      password: z.string(),
    }),
    async resolve({ ctx, input }) {
      return AuthService.signIn(ctx, input.username, input.password);
    },
  })
  .mutation('forceChangePassword', {
    input: z.object({
      session: z.string(),
      username: z.string().email(),
      newPassword: z.string(),
    }),
    resolve({ input }) {
      return AuthService.forceChangePassword(input.session, input.username, input.newPassword);
    },
  })
  .mutation('signOut', {
    async resolve({ ctx }) {
      const refreshToken = getCookie('refreshToken', { req: ctx.req, res: ctx.res as any });

      if (!refreshToken)
        return {
          status: false,
          message: 'missing refresh token',
        };

      await AuthService.signOut(refreshToken.toString());

      deleteCookie('refreshToken', { req: ctx.req, res: ctx.res as any });
      deleteCookie('userId', { req: ctx.req, res: ctx.res as any });
    },
  })
  .mutation('refreshToken', {
    async resolve({ ctx }) {
      console.log('refreshing');
      return AuthService.refreshTokens(ctx);
    },
  });
