import request from 'supertest';
import { app, sequelize } from '@infra/@Shared/api/express';

describe('e2e test product - FIND', () => {
   beforeEach(async () => {
      await sequelize.sync({ force: true });
   });

   afterAll(async () => {
      await sequelize.close();
   });

   it('should find a product', async () => {
      const payload = {
         name: 'Product 1',
         price: 199.9,
      };
      const { body: productCreated } = await request(app).post('/product').send(payload);
      const { status, body: product } = await request(app).get(`/product/${productCreated.id}`);

      expect(status).toBe(200);
      expect(product).toEqual(productCreated);
   });

   it('should throw an error when trying finding a product with invalid-uuid', async () => {
      const payload = {
         name: 'Product 1',
         price: 199.9,
      };
      await request(app).post('/product').send(payload);
      const { status, body } = await request(app).get('/product/invalid-uuid');

      expect(status).toBe(404);
      expect(body).toEqual({
         status: 'error',
         message: 'Product not found!',
      });
   });
});
