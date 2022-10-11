import { z } from 'zod';
import { createRouter } from '../createRouter';

interface User {
  id: number;
  name: string;
}

const userList: User[] = [
  {
    id: 1,
    name: 'user1',
  },
  {
    id: 2,
    name: 'user2',
  },
];

export const userRouter = createRouter().query('getUserById', {
  input: z.number(),
  resolve({ input }) {
    const foundUser = userList.find((itrUser) => itrUser.id === input);
    return foundUser || null;
  },
});
