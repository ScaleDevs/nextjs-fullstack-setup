import * as bcrypt from 'bcrypt';
import { IUser } from '@/utils/types';
import { UserRepository } from '@/server/repository/user.repo';

class Service {
  public async registerUser(userData: Omit<IUser, 'id' | 'salt'>) {
    try {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(userData.password, salt);
      const result = await UserRepository.createUser({ ...userData, password: hashedPassword, salt });
      return result;
    } catch (err) {
      return {
        code: 'internal_error',
        status: false,
      };
    }
  }
}

export const UserService = new Service();
