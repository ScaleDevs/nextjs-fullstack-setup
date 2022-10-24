import { z } from 'zod';
import { createRouter } from '../createRouter';
import { AuthService } from '@/svc/auth.service';
import { deleteCookie, getCookie, setCookie } from 'cookies-next';
import { constants } from '../constants';

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
      const result = await AuthService.signIn(input.username, input.password);

      setCookie('refreshToken', result?.AuthenticationResult?.RefreshToken, {
        req: ctx.req,
        res: ctx.res as any,
        maxAge: constants.cognitoRefreshTokenCookieAge,
        httpOnly: true,
      });

      return result;
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
    },
  });
