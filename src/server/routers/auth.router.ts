import { z } from 'zod';
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
    resolve({ input }) {
      return AuthService.signIn(input.username, input.password);
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
