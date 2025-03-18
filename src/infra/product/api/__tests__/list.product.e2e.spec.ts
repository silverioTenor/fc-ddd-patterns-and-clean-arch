import request from 'supertest';
import { app, sequelize } from '@infra/@shared/api/express';

describe('e2e test product - LIST', () => {
   beforeEach(async () => {
      await sequelize.sync({ force: true });
   });

   afterAll(async () => {
      await sequelize.close();
   });

   it('should return a product list', async () => {
      const payload = {
         name: 'Product 1',
         price: 199.9,
      };
      const { body: productCreated } = await request(app).post('/product/create').send(payload);
      const { status, body: products } = await request(app).get('/product');

      expect(status).toBe(200);
      expect(products).toEqual({
         products: [productCreated],
      });
   });

   it('should return an empty product list when no found products', async () => {
      const { status, body: products } = await request(app).get('/product');

      expect(status).toBe(200);
      expect(products).toEqual({
         products: [],
      });
   });
});
