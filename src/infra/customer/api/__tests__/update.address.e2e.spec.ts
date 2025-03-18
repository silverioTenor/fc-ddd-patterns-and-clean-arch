import { app, sequelize } from '@infra/@shared/api/express';
import request from 'supertest';

describe('E2E test customer - UPDATE', () => {
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
         .put(`/customer/update-address/${customer.id}`)
         .send({
            address: {
               street: 'Rua do Relógio',
               number: 22,
               city: 'Londres',
               state: 'Algum Estado',
               country: 'Reino Unido',
               postalCode: 12345678,
            },
            type: 'pf',
         });

      expect(addressUpdated).toEqual({
         id: customer.id,
         name: customer.name,
         rewardPoints: customer.rewardPoints,
         active: customer.active,
         address: {
            street: 'Rua do Relógio',
            number: 22,
            city: 'Londres',
            state: 'Algum Estado',
            country: 'Reino Unido',
            postalCode: 12345678,
         },
      });
   });
});
