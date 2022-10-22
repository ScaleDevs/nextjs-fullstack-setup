import { z } from 'zod';
import { createRouter } from '../createRouter';
import { AuthService } from '@/svc/auth.service';

export const authRouter = createRouter().mutation('createUser', {
  input: z.string().email(),
  resolve({ input }) {
    console.log('CREATING USER');
    return AuthService.createUser(input);
  },
});
