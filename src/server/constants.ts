export const constants = {
  publicKey: process.env.JWT_PUBLIC_KEY as string,
  privateKey: process.env.JWT_PRIVATE_KEY as string,
  accessTokenAge: process.env.JWT_ACCESS_TOKEN_EXP as string,
  refreshTokenAge: process.env.JWT_REFRESH_TOKEN_EXP as string,
  refreshTokenCookieAge: process.env.JWT_REFRESH_TOKEN_COOKIE_EXP as string,
  algo: 'ES256',
};
