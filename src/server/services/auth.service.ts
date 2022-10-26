import {
  adminCreateUser,
  adminVerifyEmail,
  initiateAuth,
  refreshTokens,
  respondToNewPasswordAuthChallenge,
  revokeToken,
} from '@/repo/cognito.repo';
import { getCookie, setCookie } from 'cookies-next';
import { TRPCError } from '@trpc/server';

import { sendUserInvite } from '@/repo/mailersend.repo';
import { createTempPassword } from '@/utils/helper';
import { decodeToken } from '../util';
import { constants } from '../constants';

class Service {
  public async createUser(email: string) {
    const tmpPwd = createTempPassword();
    const result = await adminCreateUser(email, tmpPwd);
    await sendUserInvite(email, tmpPwd);
    return result;
  }

  public async signIn(ctx: any, username: string, password: string) {
    const result = await initiateAuth(username, password);

    if (!result || !result.AuthenticationResult)
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Something went wrong' });

    const user = await decodeToken(result.AuthenticationResult.AccessToken as string);

    setCookie('userId', user.sub, {
      req: ctx.req,
      res: ctx.res as any,
      maxAge: constants.cognitoRefreshTokenCookieAge,
      httpOnly: true,
    });

    setCookie('refreshToken', result?.AuthenticationResult?.RefreshToken, {
      req: ctx.req,
      res: ctx.res as any,
      maxAge: constants.cognitoRefreshTokenCookieAge,
      httpOnly: true,
    });

    return {
      ...result,
      expiresAt: user.exp,
    };
  }

  public async forceChangePassword(session: string, username: string, newPassword: string) {
    const result = await respondToNewPasswordAuthChallenge(session, username, newPassword);

    if (!result || !result.AuthenticationResult)
      throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Something went wrong' });

    const user = await decodeToken(result.AuthenticationResult.AccessToken as string);
    await adminVerifyEmail(username);
    return {
      ...result,
      expiresAt: user.exp,
    };
  }

  public async signOut(refreshToken: string) {
    return revokeToken(refreshToken);
  }

  public async refreshTokens(ctx: any) {
    const username = getCookie('userId', { req: ctx.req, res: ctx.res as any })?.toString();
    const refreshToken = getCookie('refreshToken', { req: ctx.req, res: ctx.res as any })?.toString();

    if (!refreshToken || !username) throw new TRPCError({ code: 'UNAUTHORIZED', message: 'No Refresh Token' });

    const result = await refreshTokens(username, refreshToken);

    if (!!result?.AuthenticationResult) {
      const user = await decodeToken(result.AuthenticationResult.AccessToken as string);
      return {
        ...result,
        expiresAt: user.exp,
      };
    }

    throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid Refresh Token' });
  }
}

export const AuthService = new Service();
