import * as bcrypt from 'bcrypt';
import * as jose from 'jose';
import { UserRepository } from '@/server/repository/user.repo';
import { IUser } from '@/utils/types';
import { constants } from '../constants';

export interface ISignInCreds {
  username: string;
  password: string;
}

class Service {
  private async generateToken(payload: any, exp: string) {
    const ecPrivateKey = await jose.importPKCS8(constants.privateKey, constants.algo);
    const jwtToken = await new jose.SignJWT({ payload })
      .setProtectedHeader({ alg: constants.algo })
      .setIssuedAt()
      .setIssuer('urn:pandevs101:issuer')
      .setAudience('urn:pandevs101:audience')
      .setExpirationTime(exp)
      .sign(ecPrivateKey);
    return jwtToken;
  }

  private async verifyToken(jwtToken: string) {
    const ecPublicKey = await jose.importSPKI(constants.publicKey, constants.algo);
    const { payload } = await jose.jwtVerify(jwtToken, ecPublicKey);
    return payload;
  }

  public async generateKeys() {
    const { publicKey, privateKey } = await jose.generateKeyPair(constants.algo);

    const spkiPemPub = await jose.exportSPKI(publicKey);
    const pkcs8PemPriv = await jose.exportPKCS8(privateKey);

    return { spkiPemPub, pkcs8PemPriv };
  }

  public async signIn(signInCreds: ISignInCreds) {
    const { username, password } = signInCreds;

    try {
      const user = await UserRepository.getUserByUsername(username);

      if (!user)
        return {
          code: 'user_not_exist',
          status: false,
        };

      const isMatch = await bcrypt.compare(password, user.password);
      if (isMatch) {
        const userInfo: Omit<IUser, 'id' | 'salt' | 'password'> = { ...user };
        const accessToken = await this.generateToken({ user: username, type: 'accessToken' }, constants.accessTokenAge);
        const refreshToken = await this.generateToken({ user: username, type: 'refreshToken' }, constants.refreshTokenAge);

        delete (userInfo as any).password;
        delete (userInfo as any).salt;

        return {
          responsePayload: {
            isMatch,
            userInfo,
            accessToken,
          },
          refreshToken,
        };
      }

      return {
        code: 'incorrect_password',
        status: false,
      };
    } catch (err) {
      return {
        code: 'internal_error',
        status: false,
        message: err,
      };
    }
  }

  public async isSignedIn(accessToken: string, refreshToken: string) {
    let user = '';

    // check refresh token (if expired return false)
    try {
      await this.verifyToken(refreshToken);
    } catch (err: any) {
      return {
        isSignedIn: false,
        code: (err as any).code,
        tokenType: 'refreshToken',
      };
    }

    // check access token (if expired regenerate again)
    try {
      const claims = jose.decodeJwt(accessToken) as any;
      user = claims.payload.user;
      await this.verifyToken(accessToken);
      return { isSignedIn: true };
    } catch (err: any) {
      if ((err as any).code === 'ERR_JWT_EXPIRED') {
        const accessToken = await this.generateToken({ user, type: 'accessToken' }, constants.accessTokenAge);
        return {
          isSignedIn: true,
          accessToken,
        };
      }
      return {
        isSignedIn: false,
        code: (err as any).code,
      };
    }
  }
}

export const AuthService = new Service();
