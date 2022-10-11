import * as bcrypt from 'bcrypt';
import prisma from '../prisma.client';
import { IUser } from '@/types';

const createUser = async (userData: Omit<IUser, 'id' | 'salt'>) => {
  try {
    console.log('CREATING USER ...');

    const isExist = await prisma.user.count({ where: { firstName: userData.firstName, lastName: userData.lastName } });

    if (isExist) {
      console.log('user exist');
      return false;
    }

    const salt = await bcrypt.genSalt();

    const result = await prisma.user.create({ data: { ...userData, salt } });
    console.log(result);
    console.log('created');
    return true;
  } catch (err) {
    console.log('ERROR');
    console.log(err);
    return false;
  }
};

export default {
  createUser,
};
