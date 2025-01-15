import { v4 as uuid } from 'uuid';
import Customer from './customer';
import validate from 'uuid-validate';
import Address from './address';

describe('Customer unit tests', () => {
   it('should create an instance', () => {
      expect(() => new Customer(uuid(), 'Willy Wonka')).toBeTruthy();
   });

   it('should throw an error when creating an instance without an ID', () => {
      expect(() => new Customer('', 'Willy Wonka')).toThrow('ID is required!');
   });

   it('should throw an error when creating an instance with an invalid ID', () => {
      const spy = jest.spyOn(validate, 'version');

      expect(() => {
         new Customer('kdaslfjdksfj', 'Willy Wonka');
      }).toThrow('ID is required!');
      expect(spy).toHaveBeenCalled();
   });

   it('should throw an error when creating an instance without a name', () => {
      expect(() => new Customer(uuid(), '')).toThrow('Name is required!');
   });

   it('should change the name', () => {
      const customer = new Customer(uuid(), 'Willy Wonka');
      customer.changeName('Charlie Bucket');

      expect(customer['name']).toBe('Charlie Bucket');
   });

   it('should throw an error when changing the name to an empty string', () => {
      expect(() => {
         new Customer(uuid(), '');
      }).toThrow('Name is required!');
   });

   it('should activate a customer', () => {
      expect(() => {
         const customer = new Customer(uuid(), 'Willy Wonka');
         const address = new Address('Street', 123, 'City', 'State', 'Country', '12345678');
         customer.changeAddress(address);
         customer.activate();
      });
   });

   it('should throw an error when activate a customer without an address', () => {
      expect(() => {
         const customer = new Customer(uuid(), 'Willy Wonka');
         customer.activate();
      }).toThrow('Address is mandatory to activate a customer!');
   });

   it('should deactivate a customer', () => {
      const customer = new Customer(uuid(), 'Willy Wonka');
      const address = new Address('Street', 123, 'City', 'State', 'Country', '12345678');
      customer.changeAddress(address);
      customer.activate();
      customer.deactivate();

      expect(customer.isActive()).toBeFalsy();
   });
});
