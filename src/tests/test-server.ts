import { ApolloServer } from '@apollo/server';
import { startStandaloneServer } from '@apollo/server/standalone';
import type { ListenOptions } from 'net';
import resolvers from "../gql/schema/index.resolvers";
import schema from "../gql/schema/index.schema";


export const createApolloServer = async (listenOptions: ListenOptions = { port: 4000 }) => {
  const server = new ApolloServer({
    typeDefs: schema,
    resolvers,
  });

  const { url } = await startStandaloneServer(server, { listen: listenOptions });

  return { server, url };
};