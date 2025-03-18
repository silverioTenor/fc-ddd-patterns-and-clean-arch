import request from 'supertest';
import { app, sequelize } from '@infra/@shared/api/express';

describe('e2e test product - CREATE', () => {
   beforeEach(async () => {
      await sequelize.sync({ force: true });
   });

   afterAll(async () => {
      await sequelize.close();
   });

   it('should create a product', async () => {
      const payload = {
         name: 'Product 1',
         price: 199.9,
      };
      const { status, body: product } = await request(app).post('/product/create').send(payload);

      expect(status).toBe(201);
      expect(product).toEqual({
         id: expect.any(String),
         name: payload.name,
         price: payload.price,
      });
   });

   it('should throw an error when trying creating a product without price', async () => {
      const payload = {
         price: 199.9
      };
      const response = await request(app).post('/product/create').send(payload);

      expect(response.status).toBe(422);
      expect(response.body).toEqual({
         status: 'error',
         message: 'Name is required',
      });
   });

   it('should throw an error when trying creating a product without price', async () => {
      const payload = {
         name: 'Product 1',
      };
      const response = await request(app).post('/product/create').send(payload);

      expect(response.status).toBe(422);
      expect(response.body).toEqual({
         status: 'error',
         message: 'Price must be greater than zero',
      });
   });
});
