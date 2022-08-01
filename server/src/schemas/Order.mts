import { extendType, nonNull, objectType } from 'nexus';
import type { NexusGenRootTypes } from '../../artifacts/nexus-typegen.mjs';
import { Buyer } from './Buyer.mjs';
import { ISODateString } from './ISODateString.mjs';
import { OrderStatus } from './OrderStatus.mjs';
import { Seller } from './Seller.mjs';
import { Warehouse } from './Warehouse.mjs';

export const Order = objectType({
  name: 'Order',
  description: 'An order placed by a buyer to be fulfilled by a seller.',
  definition(t) {
    t.nonNull.id('id', { description: 'Identifier of this order.' });
    t.nonNull.id('buyerId', {
      description: 'Identifier of the buyer fulfilling this order.',
    });
    t.nonNull.field('buyer', {
      type: Buyer,
      description: 'Buyer of this order.',
      resolve: async ({ buyerId }, _, { dataSources }) => {
        return (await dataSources.dummyAPI.getBuyer(buyerId)) as NonNullable<
          NexusGenRootTypes['Buyer']
        >;
      },
    });
    t.nonNull.id('sellerId', {
      description: 'Identifier of the seller placing this order.',
    });
    t.nonNull.field('seller', {
      type: Seller,
      description: 'Seller of this order.',
      resolve: async ({ sellerId }, _, { dataSources }) => {
        return (await dataSources.dummyAPI.getSeller(sellerId)) as NonNullable<
          NexusGenRootTypes['Seller']
        >;
      },
    });
    t.nonNull.int('price', { description: 'Price of the item in pence.' });
    t.nonNull.field('status', {
      type: nonNull(OrderStatus),
      description: 'Status of an order.',
    });
    t.nonNull.id('warehouseId', {
      description: 'Identifier of the warehouse storing the order.',
    });
    t.nonNull.field('warehouse', {
      type: Warehouse,
      description: 'Warehouse storing this order.',
      resolve: async ({ warehouseId }, _, { dataSources }) => {
        return (await dataSources.dummyAPI.getWarehouse(
          warehouseId
        )) as NonNullable<NexusGenRootTypes['Warehouse']>;
      },
    });
    t.field('shippedAt', {
      type: ISODateString,
      description:
        'The UTC ISO DateTime when the order was shipped to the buyer.',
    });
  },
});

export const OrderQueries = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('getOrders', {
      description: 'Retrieves all orders.',
      type: nonNull(Order),
      resolve: async (_, __, { dataSources }) => {
        return await dataSources.dummyAPI.getOrders();
      },
    });
  },
});
