import { interfaceType } from 'nexus';

export const Person = interfaceType({
  name: 'Person',
  description: 'Base object for a person.',
  definition(t) {
    t.nonNull.id('id', { description: 'Identifier of the person.' });
    t.nonNull.string('firstName', { description: 'First name of the person.' });
    t.nonNull.string('lastName', { description: 'Last name of the person.' });
  },
  resolveType: () => {
    return null;
  },
});
