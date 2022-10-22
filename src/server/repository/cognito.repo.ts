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
  } catch (err) {
    console.log('ERR');
    console.log(err);
  }
};
