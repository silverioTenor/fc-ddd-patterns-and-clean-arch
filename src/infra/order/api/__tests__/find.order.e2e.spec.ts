import { app, sequelize } from '@infra/@shared/api/express';
import request from 'supertest';

describe('e2e test order - FIND', () => {
   beforeEach(async () => {
      await sequelize.sync({ force: true });
   });

   afterAll(async () => {
      await sequelize.close();
   });

   it('should find an order', async () => {
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

      const { body: order } = await request(app)
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

      const { status, body: foundOrder } = await request(app).get(`/order/${order.id}`).send();

      expect(status).toBe(200);
      expect(foundOrder).toEqual(order);
   });

   it('should throw an error when trying finding an order with invalid-uuid', async () => {
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

      await request(app)
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

      const { status, body } = await request(app).get('/order/invalid-uuid').send()

      expect(status).toBe(404);
      expect(body).toEqual({
         status: 'error',
         message: 'Order not found!',
      });
   });
});
