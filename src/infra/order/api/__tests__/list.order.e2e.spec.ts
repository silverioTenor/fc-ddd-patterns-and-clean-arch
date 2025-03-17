import { app, sequelize } from '@infra/@shared/api/express';
import request from 'supertest';

describe('e2e test order - LIST', () => {
   beforeEach(async () => {
      await sequelize.sync({ force: true });
   });

   afterAll(async () => {
      await sequelize.close();
   });

   test('should return an order list', async () => {
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

      const { status, body: orderList } = await request(app).get('/order').send();

      expect(status).toBe(200);
      expect(orderList).toEqual({
         orders: [order]
      });
   });

   test('should return an empty list when no found order', async () => {
      const { status, body } = await request(app).get('/order').send()

      expect(status).toBe(200);
      expect(body).toEqual({
         orders: []
      });
   });
});
