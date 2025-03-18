import { app, sequelize } from '@infra/@shared/api/express';
import request from 'supertest';

describe('e2e test order - UPDATE', () => {
   beforeEach(async () => {
      await sequelize.sync({ force: true });
   });

   afterAll(async () => {
      await sequelize.close();
   });

   it('should update an order', async () => {
      const { body: customer } = await request(app)
         .post('/customer/create')
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

      const { body: orderCreated } = await request(app)
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

      const { status, body: orderUpdated } = await request(app)
         .put(`/order/${orderCreated.id}`)
         .send({
            customerId: customer.id,
            products: (orderCreated.items as any[]).map(i => {
               return {
                  id: i.id,
                  productId: product.id,
                  productName: product.name,
                  quantity: 4,
                  price: product.price,
               };
            }),
         });

      expect(status).toBe(200);
      expect(orderUpdated.items[0].quantity).toBe(4);
   });

   it('should throw an error when trying updating an order without items', async () => {
      const { body: customer } = await request(app)
         .post('/customer/create')
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

      const { body: orderCreated } = await request(app)
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

      const { status, body: orderUpdated } = await request(app)
         .put(`/order/${orderCreated.id}`)
         .send({
            customerId: customer.id,
         });

      expect(status).toBe(500);
      expect(orderUpdated).toEqual({
         status: 'error',
         message: 'Internal server error',
      });
   });
});
