import React from 'react';
import {
  ApolloClient,
  ApolloProvider as ApolloCoreProvider,
  InMemoryCache,
} from '@apollo/client';
import environment from './environment';

const client = new ApolloClient({
  name: 'apollo-nexus-client',
  version: '1.337',
  uri: environment.apolloServerURL,
  cache: new InMemoryCache(),
});

interface ApolloProviderProps {
  children: React.ReactNode;
}

const ApolloProvider: React.FC<ApolloProviderProps> = ({ children }) => {
  return <ApolloCoreProvider client={client}>{children}</ApolloCoreProvider>;
};

export default ApolloProvider;
