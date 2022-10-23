import * as trpc from '@trpc/server';

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
