import * as trpc from '@trpc/server';
import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { JwtExpiredError } from 'aws-jwt-verify/error';
import { TRPCError } from '@trpc/server';

import { constants } from './constants';

const verifier = CognitoJwtVerifier.create({
  userPoolId: constants.UserPoolId as string,
  tokenUse: 'access',
  clientId: constants.appClientId as string,
});

export const trpcErrorHandling = (err: any) => {
  if (err['$fault'] === 'client')
    throw new trpc.TRPCError({
      code: 'BAD_REQUEST',
      message: err.message || err.__type,
      cause: err,
    });
  else
    throw new trpc.TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Something went wrong',
      cause: err,
    });
};

export const createUsertrpcErrorHandling = (err: any) => {
  if (err['$fault'] === 'client')
    throw new trpc.TRPCError({
      code: 'CONFLICT',
      message: err.__type,
      cause: err,
    });
  else
    throw new trpc.TRPCError({
      code: 'INTERNAL_SERVER_ERROR',
      message: 'Something went wrong',
      cause: err,
    });
};

export const authMiddleware = async ({ ctx, next }: any) => {
  try {
    const token = ctx.req.headers.authorization?.split(' ')[1];

    if (!token) throw new TRPCError({ code: 'UNAUTHORIZED', message: 'No Access Tokens' });

    await verifier.verify(token);
    return next();
  } catch (err) {
    if (err instanceof JwtExpiredError) throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Access Token Expired' });
    else throw new TRPCError({ code: 'UNAUTHORIZED', message: 'Invalid Access Token' });
  }
};

export const decodeToken = async (token: string) => {
  try {
    const result = await verifier.verify(token);
    return result;
  } catch (err) {
    throw new TRPCError({ code: 'INTERNAL_SERVER_ERROR', message: 'Something went wrong' });
  }
};
