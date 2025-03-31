import { app, sequelize } from '@infra/@shared/api/express';
import request from 'supertest';

describe('E2E test customer - LIST', () => {
   beforeEach(async () => {
      await sequelize.sync({ force: true });
   });

   afterAll(async () => {
      await sequelize.close();
   });

   it('should list all customers', async () => {
      const { body: customer1 } = await request(app)
         .post('/customer/create')
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
         .post('/customer/create')
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
      expect(responseCustomerList.body).toStrictEqual({ customers: [customer1, customer2] });
   });

   it('should return a list of customers in XML format', async () => {
      const { body: customer1 } = await request(app)
         .post('/customer/create')
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
         .post('/customer/create')
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

      const { status, text: responseListXML } = await request(app)
         .get('/customer')
         .set('Accept', 'application/xml')
         .send();

      expect(status).toBe(200);
      expect(responseListXML).toContain('<?xml version="1.0" encoding="UTF-8"?>');
      expect(responseListXML).toContain('<customers>');
      expect(responseListXML).toContain('<customer>');
      expect(responseListXML).toContain('<name>Willy Wonka</name>');
      expect(responseListXML).toContain('<address>');
      expect(responseListXML).toContain('<street>Chocolate Factory</street>');
      expect(responseListXML).toContain('</address>');
      expect(responseListXML).toContain('</customer>');
      expect(responseListXML).toContain('</customers>');
   });

   it('should return an empty list when no found customers', async () => {
      const responseCustomerList = await request(app).get('/customer').send();

      expect(responseCustomerList.body).toStrictEqual({ customers: [] });
   });
});
