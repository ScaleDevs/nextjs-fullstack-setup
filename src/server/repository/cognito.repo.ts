import crypto from 'crypto';
import {
  CognitoIdentityProviderClient,
  AdminCreateUserCommand,
  InitiateAuthCommand,
  RespondToAuthChallengeCommand,
  AuthFlowType,
  ChallengeNameType,
  AdminUpdateUserAttributesCommand,
  MessageActionType,
  RevokeTokenCommand,
} from '@aws-sdk/client-cognito-identity-provider';

import { constants } from '../constants';
import { createUsertrpcErrorHandling, trpcErrorHandling } from '../util';

const client = new CognitoIdentityProviderClient({
  region: constants.Region,
  credentials: {
    accessKeyId: constants.AccessKeyId as string,
    secretAccessKey: constants.SecretAccessKey as string,
  },
});

const createSecretHash = (username: string) => {
  const hmac = crypto.createHmac('sha256', constants.appClientSecret as string);

  const data = hmac.update(username + constants.appClientId);

  return data.digest('base64');
};

export const adminCreateUser = async (email: string, tmpPwd: string) => {
  try {
    const command = new AdminCreateUserCommand({
      UserPoolId: constants.UserPoolId,
      Username: email,
      MessageAction: MessageActionType.SUPPRESS,
      TemporaryPassword: tmpPwd,
    });

    await client.send(command);
    return true;
  } catch (err: any) {
    console.log(err);
    createUsertrpcErrorHandling(err);
  }
};

export const initiateAuth = async (username: string, password: string) => {
  try {
    const command = new InitiateAuthCommand({
      ClientId: constants.appClientId,
      AuthFlow: AuthFlowType.USER_PASSWORD_AUTH,
      AuthParameters: {
        USERNAME: username,
        PASSWORD: password,
        SECRET_HASH: createSecretHash(username),
      },
    });

    return await client.send(command);
  } catch (err: any) {
    trpcErrorHandling(err);
  }
};

export const respondToNewPasswordAuthChallenge = async (session: string, username: string, newPassword: string) => {
  try {
    const command = new RespondToAuthChallengeCommand({
      ClientId: constants.appClientId,
      ChallengeName: ChallengeNameType.NEW_PASSWORD_REQUIRED,
      Session: session,
      ChallengeResponses: {
        SECRET_HASH: createSecretHash(username),
        USERNAME: username,
        NEW_PASSWORD: newPassword,
      },
    });

    return await client.send(command);
  } catch (err: any) {
    trpcErrorHandling(err);
  }
};

export const adminVerifyEmail = async (username: string) => {
  try {
    const command = new AdminUpdateUserAttributesCommand({
      UserPoolId: constants.UserPoolId,
      Username: username,
      UserAttributes: [{ Name: 'email_verified', Value: 'True' }],
    });

    await client.send(command);
  } catch (err: any) {
    trpcErrorHandling(err);
  }
};

export const revokeToken = async (refreshToken: string) => {
  try {
    const command = new RevokeTokenCommand({
      ClientId: constants.appClientId,
      ClientSecret: constants.appClientSecret,
      Token: refreshToken,
    });

    await client.send(command);

    console.log('=== REVOKE TOKEN SUCCESSFULY');

    return true;
  } catch (err) {
    trpcErrorHandling(err);
  }
};
