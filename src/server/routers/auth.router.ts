import { z } from 'zod';
import { setCookie, getCookie } from 'cookies-next';
import { createRouter } from '../createRouter';
import { AuthService } from '@/svc/auth.service';
import { constants } from '../constants';

export const authRouter = createRouter()
  .query('isSignedIn', {
    input: z.string(),
    async resolve({ ctx, input }) {
      const accessToken = input;
      const refreshToken = getCookie('pandevs101RefreshToken', { req: ctx.req, res: ctx.res as any })?.toString();

      if (refreshToken) {
        const token = await AuthService.isSignedIn(accessToken, refreshToken);
        return token;
      }

      return {
        code: 'no_refresh_token',
        statusCode: 400,
        isSignedIn: false,
      };
    },
  })
  .query('generateKeys', {
    async resolve() {
      const token = await AuthService.generateKeys();
      return token;
    },
  })
  .mutation('signIn', {
    input: z.object({
      username: z.string(),
      password: z.string(),
    }),
    async resolve({ ctx, input }) {
      const result = await AuthService.signIn(input);

      if (result.responsePayload) {
        setCookie('pandevs101RefreshToken', result.refreshToken, {
          req: ctx.req,
          res: ctx.res as any,
          maxAge: parseInt(constants.refreshTokenCookieAge, 10),
          httpOnly: true,
        });
        return result.responsePayload;
      }

      return result;
    },
  });
