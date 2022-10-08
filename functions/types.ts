import { User } from '@prisma/client';

export type IUser = Omit<User, 'id' | 'salt'>;
