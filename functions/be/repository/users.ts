import * as bcrypt from 'bcrypt';
import prisma from './prisma.client';
import IUser from '@/functions/types';

const createUser = async (userData: IUser) => {
  try {
    console.log('CREATING USER ...');

    const isExist = await prisma.user.count({ where: { firstName: 'asd' } });
    console.log('isExist', isExist);
    if (isExist) {
      console.log('user exist');
      return;
    }

    const salt = await bcrypt.genSalt();

    const result = await prisma.user.create({ data: { ...userData, salt } });
    console.log(result);
    console.log('created');
  } catch (err) {
    console.log('ERROR');
    console.log(err);
  }
};

export default {
  createUser,
};
