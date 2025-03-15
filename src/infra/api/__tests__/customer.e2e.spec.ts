import { app, sequelize } from '../express';
import request from 'supertest';

describe('E2E test for customer', () => {
   beforeEach(async () => {
      await sequelize.sync({ force: true });
   });

   afterAll(async () => {
      await sequelize.close();
   });

   test('should create a customer', async () => {
      const response = await request(app)
         .post('/customer')
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

      expect(response.status).toBe(201);
      expect(response.body).toEqual({
         id: expect.any(String),
         name: 'Willy Wonka',
         rewardPoints: 5,
         active: true,
         address: {
            street: 'Chocolate Factory',
            number: 22,
            city: 'Wonderland',
            state: 'Fairyland',
            country: 'Candyland',
            postalCode: 12345678,
         },
      });
   }, 60000);

   test('should throw an error when trying create a customer with invalid data', async () => {
      const response = await request(app)
         .post('/customer')
         .send({
            name: 'Willy Wonka',
            type: 'pf',
         });

      expect(response.status).toBe(500);
   }, 60000);
});
