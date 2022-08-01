import { server } from '../server.mjs';

`orders.spec.js`

getOrders
 -> returns orders.

===

`buyers.spec.js`

getBuyers
  -> returns buyers.
  -> calls datasource with correct sort arguments (we'd do this normally via nock and assert the endpoint got called with the expected query params)

updateBuyer
  -> calls mocked datasource correctly to mutate record.
  -> can return ForbiddenNameError
  -> can return FrozenRecordError
  -> top-level throws for an unknown error


// describe('HelloWorld', () => {
//   test('Jimbo', async () => {
//     const GET_BUYERS_QUERY = `
//       getBuyers(sortBy: $sortBy) {
//         id
//         firstName
//         lastName
//         shippingAddress
//       }
//     `;

//     const { errors, data } = await server.executeOperation({
//       query: GET_BUYERS_QUERY,
//     });

//     expect(errors).toEqual(undefined);
//     expect(data).toEqual({
//       mveInvoice: {
//         approvalStatus: {
//           approvers: [
//             {
//               actionDate: {
//                 datetime: '2022-06-13T11:41:00Z',
//                 timezone: 'America/Chicago',
//               },
//               name: 'Anakin Skywalker',
//               state: 'APPROVED',
//               type: 'CLIENT_APPROVER',
//             },
//           ],
//         },
//       },
//     });
//   });
// });
