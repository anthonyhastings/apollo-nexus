import DummyAPI from './dummy-api.mjs';

export interface SchemaContext {
  dataSources: {
    dummyAPI: DummyAPI,
  };
}
