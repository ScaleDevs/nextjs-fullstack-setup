import { CognitoJwtVerifier } from 'aws-jwt-verify';
import { z } from 'zod';
import { createRouter } from '../createRouter';
import { constants } from '../constants';

const verifier = CognitoJwtVerifier.create({
  userPoolId: constants.UserPoolId as string,
  tokenUse: 'access',
  clientId: constants.appClientId as string,
});

export const userRouter = createRouter()
  .middleware(async ({ ctx, next }) => {
    console.log('MIDDLEWARE');
    console.log(ctx.req.headers);
    return next();
  })
  .mutation('hi', {
    input: z.string(),
    async resolve({ input }) {
      try {
        console.log('hey');
        const payload = await verifier.verify(input);
        console.log('Token is valid:', payload);

        return 'hi';
      } catch (err) {
        console.log('Error here =======');
        return false;
      }
    },
  });
