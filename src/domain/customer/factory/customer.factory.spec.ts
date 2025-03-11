import Customer from "../entity/customer";
import CustomerPj from "../entity/customer-pj";
import CustomerFactory from "./customer.tactory";

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
         }
      });

      expect(customer).toBeInstanceOf(Customer);
      expect(customer.getId()).toBeDefined();
      expect(customer.isActive()).toBeTruthy();
      expect(customer.getAddress()).toEqual({
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
         }
      });

      expect(customerpj).toBeInstanceOf(CustomerPj);
      expect(customerpj.getId()).toBeDefined();
      expect(customerpj.isActive()).toBeTruthy();
      expect(customerpj.getAddress()).toEqual({
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
            }
         });
      }).toThrow('Customer type not allowed');
   });
});
