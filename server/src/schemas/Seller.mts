import { nonNull, objectType } from 'nexus';
import { Person } from './Person.mjs';
import { PaymentMethod } from './PaymentMethod.mjs';

export const Seller = objectType({
  name: 'Seller',
  description: 'A person who submits orders.',
  definition(t) {
    t.implements(Person);
    t.nonNull.list.field('acceptedPaymentMethods', {
      type: nonNull(PaymentMethod),
      description: 'Methods of payment this seller accepts.',
    });
    t.nonNull.boolean('isAcceptingOrders', {
      description: 'If the seller is currently accepting new orders.',
    });
    t.string('shippingNotice', {
      description:
        'Information outlining restrictions this seller has with shipping.',
    });
  },
});
