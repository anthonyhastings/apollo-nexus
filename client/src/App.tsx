import React from 'react';
import ApolloProvider from './ApolloProvider';
import BuyersManager from './BuyersManager';
import OrdersTable from './OrdersTable';

const App: React.FC = () => {
  return (
    <ApolloProvider>
      <BuyersManager />
      <OrdersTable />
    </ApolloProvider>
  );
};

export default App;
