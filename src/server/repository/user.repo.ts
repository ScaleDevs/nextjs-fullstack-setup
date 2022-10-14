import prisma from '../prisma.client';
import { IUser } from '@/utils/types';

class Respository {
  public async createUser(userData: Omit<IUser, 'id'>) {
    const isExist = await prisma.user.count({
      where: { firstName: userData.firstName, lastName: userData.lastName, username: userData.username },
    });

    if (isExist)
      return {
        code: 'user_exist',
        status: false,
      };

    const result = await prisma.user.create({ data: { ...userData } });
    return result;
  }

  public async getUserByUsername(username: string) {
    const user = prisma.user.findUnique({ where: { username } });

    return user;
  }
}

export const UserRepository = new Respository();
