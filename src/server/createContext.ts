import { PrismaClient } from '@prisma/client';
import * as trpc from '@trpc/server';
import * as trpcNext from '@trpc/server/adapters/next';
import { NodeHTTPCreateContextFnOptions } from '@trpc/server/adapters/node-http';
import { IncomingMessage } from 'http';
import ws from 'ws';

const prisma = new PrismaClient({
  log: process.env.NODE_ENV === 'development' ? ['query', 'error', 'warn'] : ['error'],
});

export const createContext = async ({
  req,
  res,
}: trpcNext.CreateNextContextOptions | NodeHTTPCreateContextFnOptions<IncomingMessage, ws>) => {
  return {
    req,
    res,
    prisma,
  };
};

export type Context = trpc.inferAsyncReturnType<typeof createContext>;
