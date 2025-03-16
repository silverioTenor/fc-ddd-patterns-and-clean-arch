import request from 'supertest';
import { app, sequelize } from '@infra/@Shared/api/express';

describe('e2e test product - UPDATE', () => {
   beforeEach(async () => {
      await sequelize.sync({ force: true });
   });

   afterAll(async () => {
      await sequelize.close();
   });

   it('should update a product', async () => {
      const payload = {
         name: 'Product 1',
         price: 199.9,
      };
      const { body: productCreated } = await request(app).post('/product').send(payload);

      payload.name = 'Product Updated';
      payload.price = 149.9;

      const { status, body: productUpdated } = await request(app)
         .put(`/product/${productCreated.id}`)
         .send(payload);

      expect(status).toBe(200);
      expect(productUpdated).toEqual({
         id: productCreated.id,
         name: payload.name,
         price: payload.price,
      });
   });

   it('should throw an error when trying updating a product with invalid-uuid', async () => {
      const payload = {
         name: 'Product 1',
         price: 199.9,
      };
      await request(app).post('/product').send(payload);

      payload.name = 'Product Updated';
      payload.price = 149.9;

      const { status, body: productUpdated } = await request(app)
         .put('/product/invalid-uuid')
         .send(payload);

      expect(status).toBe(404);
      expect(productUpdated).toEqual({
         status: 'error',
         message: 'Product not found!',
      });
   });
});
