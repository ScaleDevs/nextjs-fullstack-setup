import { z } from 'zod';
import { createRouter } from '../createRouter';
import { AuthService } from '@/svc/auth.service';
import { setCookie } from 'cookies-next';
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
  });
