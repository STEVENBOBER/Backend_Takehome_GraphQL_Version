import { ApolloServer } from '@apollo/server';
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import express from 'express'
import http from 'http';
import cors from 'cors';
import resolvers from './gql/schema/index.resolvers'
import schema from './gql/schema/index.schema'
import { connectDatabase } from './db/Connection';

interface MyContext {
  token?: String;
}


export async function startApolloServer(schema: any, resolvers: any) {

  const app = express();

  connectDatabase()

  const httpServer = http.createServer(app);


  const server = new ApolloServer<MyContext>({
    typeDefs: schema,
    resolvers,
    plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
  });

  await server.start();


  app.use(
    '/graphql',
    cors<cors.CorsRequest>(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => ({ token: req.headers.token }),
    }),
  );

  await new Promise<void>((resolve) => httpServer.listen({ port: 4000 }, resolve));
  console.log(`🚀 Server ready at http://localhost:4000/graphql`);

  // Requests to `http://localhost:4000/health` now return "Okay!"
  // app.get('/health', (req, res) => {
  //   res.status(200).send('Okay!');
  // });

}

startApolloServer(schema, resolvers)




