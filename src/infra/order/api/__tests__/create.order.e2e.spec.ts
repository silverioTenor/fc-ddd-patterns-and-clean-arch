import { app, sequelize } from '@infra/@Shared/api/express';
import request from 'supertest';

describe('e2e test order - CREATE', () => {
   beforeEach(async () => {
      await sequelize.sync({ force: true });
   });

   afterAll(async () => {
      await sequelize.close();
   });

   it('should create an order', async () => {
      const { body: customer } = await request(app)
         .post('/customer')
         .send({
            name: 'Willy Wonka',
            address: {
               street: 'string',
               number: 10,
               city: 'string',
               state: 'string',
               country: 'string',
               postalCode: 12345678,
            },
         });

      const { body: product } = await request(app).post('/product').send({
         name: 'Product 1',
         price: 19.9,
      });

      const { status, body: order } = await request(app)
         .post('/order')
         .send({
            customerId: customer.id,
            products: [
               {
                  id: product.id,
                  name: product.name,
                  quantity: 2,
                  price: product.price,
               },
            ],
         });

      expect(status).toBe(201);
      expect(order).toEqual({
         id: order.id,
         customerId: customer.id,
         items: (order.items as any[]).map(i => {
            return {
               id: i.id,
               productId: product.id,
               productName: product.name,
               quantity: i.quantity,
               price: product.price,
            };
         }),
      });
   });

   it('should throw an error when trying creating an order without customerId', async () => {
      const { body: product } = await request(app).post('/product').send({
         name: 'Product 1',
         price: 19.9,
      });

      const { status, body } = await request(app)
         .post('/order')
         .send({
            products: [
               {
                  id: product.id,
                  name: product.name,
                  quantity: 2,
                  price: product.price,
               },
            ],
         });

      expect(status).toBe(422);
      expect(body).toEqual({
         status: 'error',
         message: 'Customer id is required!',
      });
   });
});
