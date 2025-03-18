import { app, sequelize } from '@infra/@shared/api/express';
import request from 'supertest';

describe('E2E test for customer', () => {
   beforeEach(async () => {
      await sequelize.sync({ force: true });
   });

   afterAll(async () => {
      await sequelize.close();
   });

   it('should update an address by customer ID', async () => {
      const { body: customer } = await request(app)
         .post('/customer/create')
         .send({
            name: 'Willy Wonka',
            address: {
               street: 'Chocolate Factory',
               number: 22,
               city: 'Wonderland',
               state: 'Fairyland',
               country: 'Candyland',
               postalCode: 12345678,
            },
            type: 'pf',
         });

         const { body: addressUpdated } = await request(app)
         .patch(`/customer/update/${customer.id}`)
         .send({
            name: 'Jorjão'
         });

      expect(addressUpdated).toEqual({
         id: customer.id,
         name: 'Jorjão',
         rewardPoints: customer.rewardPoints,
         active: customer.active,
         address: customer.address,
      });
   });
});
