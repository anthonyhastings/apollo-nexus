import { ApolloServer } from 'apollo-server';
import { ApolloServerPluginInlineTrace } from 'apollo-server-core';
import DummyAPI from './contexts/dummy-api.mjs';
import schema from './schema.mjs';

const startServer = async () => {
  const server = new ApolloServer({
    dataSources: () => ({
      dummyAPI: new DummyAPI(),
    }),
    plugins: [ApolloServerPluginInlineTrace()],
    schema,
  });

  const { url } = await server.listen({ port: process.env.APOLLO_PORT });

  return { server, url };
};

export default startServer;
