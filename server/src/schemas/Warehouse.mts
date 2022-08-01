import { objectType } from 'nexus';

export const Warehouse = objectType({
  name: 'Warehouse',
  description: 'A warehouse that stores items.',
  definition(t) {
    t.nonNull.id('id', { description: 'Identifier of this warehouse.' });
    t.nonNull.string('name', { description: 'Name of this warehouse.' });
    t.nonNull.string('address', { description: 'Address of this warehouse.' });
  },
});
