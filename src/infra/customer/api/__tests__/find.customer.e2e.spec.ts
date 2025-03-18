import { app, sequelize } from '@infra/@shared/api/express';
import request from 'supertest';

describe('e2e test customer - FIND', () => {
   beforeEach(async () => {
      await sequelize.sync({ force: true });
   });

   afterAll(async () => {
      await sequelize.close();
   });

   it('should find a customer by ID', async () => {
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

      const { body: foundCustomer } = await request(app).get(`/customer/find/${customer.id}`).send();

      expect(foundCustomer).toEqual(customer);
   });

   it('should throw an error when trying find a customer with invalid-id', async () => {
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

      const response = await request(app).get(`/customer/find/abc123`).send();

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
         status: 'error',
         message: 'Customer not found!',
      });
   });
});
