import { z } from 'zod';
import { createRouter } from '../createRouter';
import { UserService } from '@/svc/user.service';

export const userRouter = createRouter().mutation('registerUser', {
  input: z.object({
    firstName: z.string(),
    middleName: z.string(),
    lastName: z.string(),
    birthday: z.date(),
    address: z.string(),
    username: z.string(),
    password: z.string(),
  }),
  resolve({ input }) {
    return UserService.registerUser(input);
  },
});
