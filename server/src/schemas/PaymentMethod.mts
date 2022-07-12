import { enumType } from 'nexus';

export const PaymentMethod = enumType({
  name: 'PaymentMethod',
  description: 'Payment methods that can occur within orders.',
  members: ['VISA', 'MASTERCARD', 'PAYPAL', 'CASH'],
});
