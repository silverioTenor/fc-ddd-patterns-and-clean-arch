import { app, sequelize } from '../../../@Shared/api/express';
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
      const response = await request(app).post('/customer').send({
         name: 'Willy Wonka',
         type: 'pf',
      });

      expect(response.status).toBe(500);
   }, 60000);

   it('should list all customers', async () => {
      const { body: customer1 } = await request(app)
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

      const { body: customer2 } = await request(app)
         .post('/customer')
         .send({
            name: 'Juca Brasileiro',
            address: {
               street: 'Rua A',
               number: 22,
               city: 'Cidade A',
               state: 'Estado A',
               country: 'País A',
               postalCode: 12345678,
            },
            type: 'pf',
         });

      const responseCustomerList = await request(app).get('/customer').send();

      expect(responseCustomerList.body.customers.length).toBe(2);
      expect(responseCustomerList.body.customers).toStrictEqual([customer1, customer2]);
   });

   it('should find a customer by ID', async () => {
      const { body: customer } = await request(app)
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

      const { body: foundCustomer } = await request(app).get(`/customer/${customer.id}`).send();

      expect(foundCustomer).toEqual(customer);
   });

   it('should throw an error when trying find a customer with invalid-id', async () => {
      const { body: customer } = await request(app)
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

      const response = await request(app).get(`/customer/abc123`).send();

      expect(response.status).toBe(404);
      expect(response.body).toEqual({
         status: 'error',
         message: 'Customer not found!',
      });
   });

   it('should update an address by customer ID', async () => {
      const { body: customer } = await request(app)
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

         const { body: addressUpdated } = await request(app)
         .patch(`/customer/address/${customer.id}`)
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
