import { v4 as uuid } from 'uuid';
import Customer from './customer';
import validate from 'uuid-validate';
import Address from '../value-object/address';

describe('Customer unit tests', () => {
   it('should create an instance', () => {
      const uid = uuid();
      const customer = new Customer(uid, 'Willy Wonka');
      const address = new Address('Street', 123, 'City', 'State', 'Country', 12345678);

      customer.changeAddress(address);

      expect(customer.id).toStrictEqual(uid);
      expect(customer.address).toStrictEqual(address);
   });

   it('should throw an error when creating an instance without an ID', () => {
      expect(() => new Customer('', 'Willy Wonka')).toThrow('ID is required!');
   });

   it('should throw an error when creating an instance with an invalid ID', () => {
      const spy = jest.spyOn(validate, 'version');

      expect(() => {
         new Customer('invalid-uuid', 'Willy Wonka');
      }).toThrow('ID is required!');
      expect(spy).toHaveBeenCalled();
   });

   it('should throw an error when creating an instance without a name', () => {
      expect(() => new Customer(uuid(), '')).toThrow('Name is required!');
   });

   it('should change the name', () => {
      const customer = new Customer(uuid(), 'Willy Wonka');
      customer.changeName('Charlie Bucket');

      expect(customer.name).toBe('Charlie Bucket');
   });

   it('should throw an error when changing the name to an empty string', () => {
      expect(() => {
         const customer = new Customer(uuid(), 'Josh');
         customer.changeName('');
      }).toThrow('Name is required!');
   });

   it('should change the address', () => {
      const customer = new Customer(uuid(), 'Willy Wonka');
      const address = new Address('Street', 123, 'City', 'State', 'Country', 12345678);

      expect(() => customer.changeAddress(address)).not.toThrow('Address is required!');
      expect(customer.address).toStrictEqual(address);
   });

   it('should throw an error when changing the address to an empty address', () => {
      const customer = new Customer(uuid(), 'Willy Wonka');
      const address = new Address('Street', 123, 'City', 'State', 'Country', 12345678);
      const invalidAddress = {
         ...address,
         street: '',
         city: '',
         state: '',
         country: '',
      } as Address;

      expect(() => customer.changeAddress(invalidAddress)).toThrow('Address is required!');
   });

   it('should activate a customer', () => {
      expect(() => {
         const customer = new Customer(uuid(), 'Willy Wonka');
         const address = new Address('Street', 123, 'City', 'State', 'Country', 12345678);
         customer.changeAddress(address);
         customer.activate();
      });
   });

   it('should throw an error when trying activate a customer without an address', () => {
      const customer = new Customer(uuid(), 'Willy Wonka');

      expect(() => customer.activate()).toThrow('Address is mandatory to activate a customer!');
      expect(customer.isActive()).toBeFalsy();
   });

   it('should deactivate a customer', () => {
      const customer = new Customer(uuid(), 'Willy Wonka');
      const address = new Address('Street', 123, 'City', 'State', 'Country', 12345678);
      customer.changeAddress(address);
      customer.activate();
      customer.deactivate();

      expect(customer.isActive()).toBeFalsy();
   });

   it('should add points to a customer', () => {
      const customer = new Customer(uuid(), 'Willy Wonka');
      expect(customer.rewardPoints).toBe(0);

      customer.addPoints(10);
      expect(customer.rewardPoints).toBe(10);

      customer.addPoints(10);
      expect(customer.rewardPoints).toBe(20);
   });

   it('should throw an error when adding points with a negative value', () => {
      const customer = new Customer(uuid(), 'Willy Wonka');

      expect(() => customer.addPoints(0)).toThrow('Points must be greater than 0!');
      expect(() => customer.addPoints(-10)).toThrow('Points must be greater than 0!');
   });
});
