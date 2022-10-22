import { adminCreateUser } from '@/repo/cognito.repo';

class Service {
  public async createUser(email: string) {
    try {
      await adminCreateUser(email);
      return true;
    } catch (err) {
      return {
        code: 'internal_error',
        status: false,
      };
    }
  }
}

export const AuthService = new Service();
