import * as trpc from '@trpc/server';
import { CognitoIdentityProviderClient, AdminCreateUserCommand } from '@aws-sdk/client-cognito-identity-provider';

const client = new CognitoIdentityProviderClient({
  region: process.env.AWS_CONFIG_CLIENT_REGION,
  credentials: {
    accessKeyId: process.env.AWS_CONFIG_CLIENT_ACCESS_KEY_ID as string,
    secretAccessKey: process.env.AWS_CONFIG_CLIENT_SECRET_KEY as string,
  },
});

export const adminCreateUser = async (email: string) => {
  try {
    const command = new AdminCreateUserCommand({
      UserPoolId: process.env.COGNITO_USER_POOL_ID,
      Username: email,
    });

    await client.send(command);
    return { result: true };
  } catch (err: any) {
    throw new trpc.TRPCError({
      code: 'CONFLICT',
      message: err.__type,
      cause: err,
    });
  }
};
