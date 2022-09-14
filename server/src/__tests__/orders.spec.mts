import { jest } from '@jest/globals';
import { server } from '../server.mjs';
import DummyAPI from '../contexts/dummy-api.mjs';

describe('Orders Queries', () => {
  beforeEach(() => {
    jest.restoreAllMocks();
  });

  test('#getOrders', async () => {
    jest.spyOn(DummyAPI.prototype, 'getOrders').mockResolvedValue([
      {
        id: 'fake-order-99',
        buyerId: 'fake-buyer-99',
        sellerId: 'fake-seller-99',
        warehouseId: 'fake-warehouse-99',
        price: 999,
        status: 'PAID',
        shippedAt: '2022-06-19T15:00:00+01:00',
      },
    ]);

    const GET_ORDERS_QUERY = `
      query GetOrders {
        getOrders {
          id
          buyerId
          sellerId
          warehouseId
          price
          status
          shippedAt
        }
      }
    `;

    const { errors, data } = await server.executeOperation({
      query: GET_ORDERS_QUERY,
    });

    expect(errors).toEqual(undefined);
    expect(data).toEqual({
      getOrders: [
        {
          id: 'fake-order-99',
          buyerId: 'fake-buyer-99',
          price: 999,
          sellerId: 'fake-seller-99',
          shippedAt: '2022-06-19T14:00:00.000Z',
          status: 'PAID',
          warehouseId: 'fake-warehouse-99',
        },
      ],
    });
  });
});
