import { DataSource } from 'apollo-datasource';
import type {
  NexusGenEnums,
  NexusGenRootTypes,
} from '../../artifacts/nexus-typegen.mjs';

type UpdateBuyerAttributes = Partial<Omit<NexusGenRootTypes['Buyer'], 'id'>>;

export class ForbiddenNameError extends Error {
  public readonly name = 'ForbiddenNameError';

  constructor(message: string) {
    super(message);
  }
}

export class FrozenRecordError extends Error {
  public readonly name = 'FrozenRecordError';
  public readonly frozenFrom: string;

  constructor(message: string, frozenFrom: string) {
    super(message);
    this.frozenFrom = frozenFrom;
  }
}

let orders: Array<NexusGenRootTypes['Order']> = [
  {
    id: 'fake-order-01',
    buyerId: 'fake-buyer-01',
    price: 123,
    sellerId: 'fake-seller-01',
    shippedAt: '2022-06-19T15:00:00+01:00',
    status: 'PAID',
    warehouseId: 'fake-warehouse-01',
  },
  {
    id: 'fake-order-02',
    buyerId: 'fake-buyer-02',
    price: 123,
    sellerId: 'fake-seller-02',
    shippedAt: null,
    status: 'PENDING',
    warehouseId: 'fake-warehouse-01',
  },
  {
    id: 'fake-order-03',
    buyerId: 'fake-buyer-02',
    price: 123,
    sellerId: 'fake-seller-01',
    shippedAt: null,
    status: 'PENDING',
    warehouseId: 'fake-warehouse-02',
  },
];

let buyers: Array<NexusGenRootTypes['Buyer']> = [
  {
    id: 'fake-buyer-01',
    firstName: 'Joe',
    lastName: 'Bloggs',
    shippingAddress: '16 No Hot Ashes, Cityville',
  },
  {
    id: 'fake-buyer-02',
    firstName: 'Stephen',
    lastName: 'Strange',
    shippingAddress: '21 The Sanctum, Avengerville',
  },
];

let sellers: Array<NexusGenRootTypes['Seller']> = [
  {
    id: 'fake-seller-01',
    firstName: 'Sammy',
    lastName: 'Walters',
    acceptedPaymentMethods: ['MASTERCARD', 'PAYPAL'],
    isAcceptingOrders: true,
    shippingNotice: null,
  },
  {
    id: 'fake-seller-02',
    firstName: 'Wanda',
    lastName: 'Maximoff',
    acceptedPaymentMethods: ['CASH'],
    isAcceptingOrders: false,
    shippingNotice: 'Currently between realms. Will re-open shop on my return.',
  },
];

let warehouses: Array<NexusGenRootTypes['Warehouse']> = [
  {
    id: 'fake-warehouse-01',
    name: 'The Box Factory',
    address: 'Wayne Manor, Gotham',
  },
  {
    id: 'fake-warehouse-02',
    name: 'Box Emporium',
    address: '21 Gresham Lane, Madeupville',
  },
];

class DummyAPI extends DataSource {
  constructor() {
    console.log('DummyAPI::constructor');
    super();
  }

  async getOrders() {
    console.log('DummyAPI::getOrders');
    return orders;
  }

  async getBuyers({
    sortField,
    sortDirection,
  }: {
    sortField?: NexusGenEnums['BuyerSortableColumns'];
    sortDirection?: NexusGenEnums['SortDirection'];
  }) {
    console.log('DummyAPI::getBuyers', sortField, sortDirection);

    if (sortField && sortDirection) {
      const sortedResults = [...buyers].sort((elementOne, elementTwo) => {
        return elementOne[sortField]
          .toLowerCase()
          .localeCompare(elementTwo[sortField].toLowerCase());
      });

      return sortDirection === 'DESC' ? sortedResults.reverse() : sortedResults;
    }

    return buyers;
  }

  async getBuyer(id: string) {
    console.log('DummyAPI::getBuyer', id);
    return buyers.find((buyer) => buyer.id === id);
  }

  async getSeller(id: string) {
    console.log('DummyAPI::getSeller', id);
    return sellers.find((seller) => seller.id === id);
  }

  async getWarehouse(id: string) {
    console.log('DummyAPI::getWarehouse', id);
    return warehouses.find((warehouse) => warehouse.id === id);
  }

  async updateBuyer(
    id: string,
    attributes: UpdateBuyerAttributes
  ): Promise<NexusGenRootTypes['Buyer'] | undefined> {
    console.log('DummyAPI::updateBuyer', id, attributes);

    if (attributes.firstName === 'Bad' && attributes.lastName === 'Words') {
      throw new ForbiddenNameError('Name is forbidden.');
    }

    if (id === 'fake-buyer-02') {
      throw new FrozenRecordError(
        'Record is frozen and cannot be mutated.',
        '2022-07-01T23:15:00+01:00'
      );
    }

    buyers = buyers.map((buyer) => {
      if (buyer.id !== id) return buyer;
      return {
        ...buyer,
        ...attributes,
      };
    });

    return buyers.find((buyer) => buyer.id === id);
  }
}

export default DummyAPI;
