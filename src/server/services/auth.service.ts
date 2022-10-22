import { adminCreateUser } from '@/repo/cognito.repo';

class Service {
  public async createUser(email: string) {
    return adminCreateUser(email);
  }
}

export const AuthService = new Service();
