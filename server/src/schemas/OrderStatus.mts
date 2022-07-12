import { enumType } from 'nexus';

export const OrderStatus = enumType({
  name: 'OrderStatus',
  description: 'Status of an order.',
  members: ['PENDING', 'PAID', 'SHIPPED'],
});
