import { jest } from '@jest/globals';
import { server } from '../server.mjs';
import DummyAPI, {
  ForbiddenNameError,
  FrozenRecordError,
} from '../contexts/dummy-api.mjs';

describe('Buyers Queries', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('#getBuyers', async () => {
    const getBuyersSpy = jest
      .spyOn(DummyAPI.prototype, 'getBuyers')
      .mockResolvedValue([
        {
          id: 'fake-buyer-99',
          firstName: 'Bruce',
          lastName: 'Wayne',
          shippingAddress: '1 Wayne Manor, Gotham',
        },
      ]);

    const GET_BUYERS_QUERY = `
        query GetBuyers($sortBy: BuyerSortInput) {
          getBuyers(sortBy: $sortBy) {
            id
            lastName
            shippingAddress
            firstName
          }
        }
      `;

    const { errors, data } = await server.executeOperation({
      query: GET_BUYERS_QUERY,
      variables: {
        sortBy: {
          columnName: 'lastName',
          direction: 'DESC',
        },
      },
    });

    expect(getBuyersSpy).toHaveBeenCalledWith({
      sortDirection: 'DESC',
      sortField: 'lastName',
    });

    expect(errors).toEqual(undefined);
    expect(data).toEqual({
      getBuyers: [
        {
          id: 'fake-buyer-99',
          firstName: 'Bruce',
          lastName: 'Wayne',
          shippingAddress: '1 Wayne Manor, Gotham',
        },
      ],
    });
  });
});

describe('Buyers Mutations', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  describe('#updateBuyer', () => {
    const UPDATE_BUYER_MUTATION = `
      mutation UpdateBuyer($updateBuyerInput: UpdateBuyerInput!) {
        updateBuyer(input: $updateBuyerInput) {
          success
          buyer {
            id
            firstName
            lastName
            shippingAddress
          }
          userErrors {
            __typename
            ... on UserError {
              message
              path
            }
            ... on FrozenRecordError {
              frozenFrom
            }
          }
        }
      }
    `;

    it('updates and returns buyer', async () => {
      const updateBuyerSpy = jest
        .spyOn(DummyAPI.prototype, 'updateBuyer')
        .mockResolvedValue({
          id: 'fake-buyer-99',
          firstName: 'Bruce',
          lastName: 'Wayne',
          shippingAddress: '1 Wayne Manor, Gotham',
        });

      const { errors, data } = await server.executeOperation({
        query: UPDATE_BUYER_MUTATION,
        variables: {
          updateBuyerInput: {
            id: 'fake-buyer-01',
            firstName: 'Matt',
            lastName: 'Murdoch',
          },
        },
      });

      expect(updateBuyerSpy).toHaveBeenCalledWith('fake-buyer-01', {
        firstName: 'Matt',
        lastName: 'Murdoch',
      });

      expect(errors).toEqual(undefined);
      expect(data).toEqual({
        updateBuyer: {
          success: true,
          buyer: {
            id: 'fake-buyer-99',
            firstName: 'Bruce',
            lastName: 'Wayne',
            shippingAddress: '1 Wayne Manor, Gotham',
          },
          userErrors: [],
        },
      });
    });

    it('returns ForbiddenNameError when given an illegal name', async () => {
      jest
        .spyOn(DummyAPI.prototype, 'updateBuyer')
        .mockRejectedValue(new ForbiddenNameError('Name not allowed.'));

      const { errors, data } = await server.executeOperation({
        query: UPDATE_BUYER_MUTATION,
        variables: {
          updateBuyerInput: {
            id: 'fake-buyer-01',
            firstName: 'Matt',
            lastName: 'Murdoch',
          },
        },
      });

      expect(errors).toEqual(undefined);
      expect(data).toEqual({
        updateBuyer: {
          success: false,
          buyer: null,
          userErrors: [
            {
              __typename: 'ForbiddenNameError',
              message: 'Name not allowed.',
              path: ['input', 'firstName'],
            },
          ],
        },
      });
    });

    it('returns FrozenRecordError when attempting to update a frozen record', async () => {
      jest
        .spyOn(DummyAPI.prototype, 'updateBuyer')
        .mockRejectedValue(
          new FrozenRecordError(
            'Record is frozen.',
            '2022-07-01T23:15:00+01:00'
          )
        );

      const { errors, data } = await server.executeOperation({
        query: UPDATE_BUYER_MUTATION,
        variables: {
          updateBuyerInput: {
            id: 'fake-buyer-01',
            firstName: 'Matt',
            lastName: 'Murdoch',
          },
        },
      });

      expect(errors).toEqual(undefined);
      expect(data).toEqual({
        updateBuyer: {
          success: false,
          buyer: null,
          userErrors: [
            {
              __typename: 'FrozenRecordError',
              frozenFrom: '2022-07-01T22:15:00.000Z',
              message: 'Record is frozen.',
              path: ['input', 'id'],
            },
          ],
        },
      });
    });
  });
});
