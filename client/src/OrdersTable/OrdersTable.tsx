import React from 'react';
import { useGetOrdersQuery } from './api.generated';

const OrdersTable: React.FC = () => {
  const { data, error, loading } = useGetOrdersQuery();

  if (loading) {
    return <h2>Loading</h2>;
  }

  if (error) {
    return <h2>Error: {error.message}</h2>;
  }

  return (
    <>
      <table>
        <thead>
          <tr>
            <td>Order ID</td>
            <td>Price</td>
            <td>Seller: Name</td>
            <td>Buyer: Name</td>
            <td>Buyer: Shipping Address</td>
          </tr>
        </thead>
        <tbody>
          {data?.getOrders.map((order) => {
            return (
              <tr key={order.id}>
                <td>{order.id}</td>
                <td>{order.price}</td>
                <td>{`${order.seller.firstName} ${order.seller.lastName}`}</td>
                <td>{`${order.buyer.firstName} ${order.buyer.lastName}`}</td>
                <td>{order.buyer.shippingAddress}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </>
  );
};

export default OrdersTable;
