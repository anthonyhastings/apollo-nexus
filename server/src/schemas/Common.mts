import { enumType } from 'nexus';

export const SortDirection = enumType({
  name: 'SortDirection',
  description: 'Order of sort when querying record(s).',
  members: ['ASC', 'DESC'],
});
