import Mapper from '@util/mapper';
import Customer from '../entity/customer';
import CustomerPj from '../entity/customer-pj';
import CustomerFactory from './customer.tactory';

describe('Customer factory unit test', () => {
   it('should create a new instance to customer', () => {
      const customerFactory = new CustomerFactory();
      const customer = customerFactory.create({
         type: 'pf',
         name: 'Willy Wonka',
         points: 10,
         address: {
            street: 'street',
            number: 19,
            city: 'city',
            state: 'state',
            country: 'country',
            postalCode: 12345678,
         },
      });

      const customerMapped = Mapper.convertTo<Customer, any>(customer, ['notification']);

      expect(customerMapped.id).toBeDefined();
      expect(customerMapped.active).toBeTruthy();
      expect(customerMapped.address).toEqual({
         street: 'street',
         number: 19,
         city: 'city',
         state: 'state',
         country: 'country',
         postalCode: 12345678,
      });
   });

   it('should create a new instance to customer pj', () => {
      const customerFactory = new CustomerFactory();
      const customerpj = customerFactory.create({
         type: 'pj',
         companyName: 'Company name',
         tradeName: 'Trade name',
         cnpj: 12345678901234,
         points: 10,
         address: {
            street: 'street',
            number: 20,
            city: 'city',
            state: 'state',
            country: 'country',
            postalCode: 12345678,
         },
      }) as CustomerPj;

      const customerPjMapped = Mapper.convertTo<CustomerPj, any>(customerpj, [
         'notification',
      ]);

      expect(customerPjMapped.id).toBeDefined();
      expect(customerPjMapped.active).toBeTruthy();
      expect(customerPjMapped.address).toEqual({
         street: 'street',
         number: 20,
         city: 'city',
         state: 'state',
         country: 'country',
         postalCode: 12345678,
      });
   });

   it('should throw an error when creating a new instance without valid type', () => {
      const customerFactory = new CustomerFactory();
      expect(() => {
         const customerpj = customerFactory.create({
            type: 'invalid-type',
            companyName: 'Company name',
            tradeName: 'Trade name',
            cnpj: 12345678901234,
            points: 10,
            address: {
               street: 'street',
               city: 'city',
               state: 'state',
               country: 'country',
               postalCode: 12345678,
            },
         });
      }).toThrow('Customer type not allowed');
   });
});
