import { adminCreateUser, adminVerifyEmail, initiateAuth, respondToNewPasswordAuthChallenge } from '@/repo/cognito.repo';

class Service {
  public async createUser(email: string) {
    return adminCreateUser(email);
  }

  public async signIn(username: string, password: string) {
    return initiateAuth(username, password);
  }

  public async forceChangePassword(session: string, username: string, newPassword: string) {
    const result = await respondToNewPasswordAuthChallenge(session, username, newPassword);
    await adminVerifyEmail(username);
    return result;
  }
}

export const AuthService = new Service();
