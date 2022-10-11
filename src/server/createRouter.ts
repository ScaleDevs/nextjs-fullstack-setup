import { Context } from './createContext';
import * as trpc from '@trpc/server';

/**
 * Helper function to create a router with context
 */
export function createRouter() {
  return trpc.router<Context>();
}
