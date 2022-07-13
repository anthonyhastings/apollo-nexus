import {
  extendType,
  inputObjectType,
  nonNull,
  objectType,
  unionType,
} from 'nexus';
import {
  ForbiddenNameError,
  FrozenRecordError,
} from '../contexts/dummy-api.mjs';
import { ISODateString } from './ISODateString.mjs';
import { Person } from './Person.mjs';
import { UserError } from './UserError.mjs';

export const Buyer = objectType({
  name: 'Buyer',
  description: 'A person who places orders.',
  definition(t) {
    t.implements(Person);
    t.nonNull.string('shippingAddress', {
      description: 'Shipping information for this buyer.',
    });
  },
});

export const ForbiddenNameErrorPayload = objectType({
  name: 'ForbiddenNameError',
  description: 'Error indicating the name is not allowed.',
  definition(t) {
    t.implements(UserError);
  },
});

export const FrozenRecordErrorPayload = objectType({
  name: 'FrozenRecordError',
  description:
    'Error indicating the buyer account is frozen and cannot be edited.',
  definition(t) {
    t.implements(UserError);
    t.nonNull.field('frozenFrom', {
      type: ISODateString,
      description: 'The date-time string when the buyer was frozen',
    });
  },
});

export const UpdateBuyerErrors = unionType({
  name: 'UpdateBuyerErrors',
  description: 'Potential errors for the updateBuyer mutation.',
  definition(t) {
    t.members(ForbiddenNameErrorPayload, FrozenRecordErrorPayload);
  },
  resolveType: (data) => {
    if ('frozenFrom' in data) {
      return 'FrozenRecordError';
    }
    return 'ForbiddenNameError';
  },
});

export const UpdateBuyerInput = inputObjectType({
  name: 'UpdateBuyerInput',
  description: 'Input for the updateBuyer mutation.',
  definition(t) {
    t.nonNull.id('id');
    t.string('firstName');
    t.string('lastName');
    t.string('shippingAddress');
  },
});

export const UpdateBuyerPayload = objectType({
  name: 'UpdateBuyerPayload',
  description: 'Response of the updateBuyer mutation.',
  definition(t) {
    t.nonNull.boolean('success', {
      description: 'Whether the mutation succeeded or not.',
    });
    t.field('buyer', { type: Buyer, description: 'The updated buyer entity.' });
    t.nonNull.list.field('userErrors', {
      type: nonNull(UpdateBuyerErrors),
      description: 'An array of errors that occcurred during the mutation.',
    });
  },
});

export const BuyerQueries = extendType({
  type: 'Query',
  definition(t) {
    t.nonNull.list.field('getBuyers', {
      description: 'Retrieves all buyers.',
      type: nonNull(Buyer),
      resolve: async (_, __, { dataSources }) => {
        return await dataSources.dummyAPI.getBuyers();
      },
    });
  },
});

export const BuyerMutations = extendType({
  type: 'Mutation',
  definition(t) {
    t.nonNull.field('updateBuyer', {
      type: UpdateBuyerPayload,
      description: 'Updates a buyer',
      args: {
        input: nonNull(UpdateBuyerInput),
      },
      resolve: async (_, { input }, { dataSources }) => {
        const { id, ...attributes } = input;

        let updatedBuyer;
        try {
          updatedBuyer = await dataSources.dummyAPI.updateBuyer(id, {
            ...(attributes.firstName && { firstName: attributes.firstName }),
            ...(attributes.lastName && { lastName: attributes.lastName }),
            ...(attributes.shippingAddress && {
              shippingAddress: attributes.shippingAddress,
            }),
          });
        } catch (err) {
          if (err instanceof ForbiddenNameError) {
            return {
              success: false,
              userErrors: [
                {
                  message: err.message,
                  path: ['input', 'firstName'],
                  __typename: 'ForbiddenNameError',
                },
              ],
            };
          } else if (err instanceof FrozenRecordError) {
            return {
              success: false,
              userErrors: [
                {
                  message: err.message,
                  frozenFrom: err.frozenFrom,
                  path: ['input', 'id'],
                  __typename: 'FrozenRecordError',
                },
              ],
            };
          }

          throw err;
        }

        return {
          success: true,
          buyer: updatedBuyer ?? null,
          userErrors: [],
        };
      },
    });
  },
});
