import { interfaceType, nonNull } from 'nexus';

export const UserError = interfaceType({
  name: 'UserError',
  description: 'A base type for mutation errors to implement.',
  definition(t) {
    t.nonNull.string('message', {
      description: 'Description for this error',
    });
    t.nonNull.list.field('path', {
      type: nonNull('String'),
      description: 'Path to the input value causing the error.',
    });
  },
  resolveType: (data) => {
    return null;
  },
});
