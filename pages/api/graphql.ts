import 'reflect-metadata';
import { createServer } from '@graphql-yoga/node';
import { buildSchema } from 'type-graphql';
import { UserResolver } from 'modules/be/users/users.resolver';

const schema = await buildSchema({
  resolvers: [UserResolver],
});

const server = createServer({
  schema,
  endpoint: '/api/graphql',
  // graphiql: false // uncomment to disable GraphiQL
});

export default server;
