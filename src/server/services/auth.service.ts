import {
  adminCreateUser,
  adminVerifyEmail,
  initiateAuth,
  respondToNewPasswordAuthChallenge,
  revokeToken,
} from '@/repo/cognito.repo';
import { sendUserInvite } from '@/repo/mailersend.repo';
import { createTempPassword } from '@/utils/helper';

class Service {
  public async createUser(email: string) {
    const tmpPwd = createTempPassword();
    const result = await adminCreateUser(email, tmpPwd);
    await sendUserInvite(email, tmpPwd);
    return result;
  }

  public async signIn(username: string, password: string) {
    return initiateAuth(username, password);
  }

  public async forceChangePassword(session: string, username: string, newPassword: string) {
    const result = await respondToNewPasswordAuthChallenge(session, username, newPassword);
    await adminVerifyEmail(username);
    return result;
  }

  public async signOut(refreshToken: string) {
    return revokeToken(refreshToken);
  }
}

export const AuthService = new Service();
