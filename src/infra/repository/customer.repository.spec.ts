import { Sequelize } from 'sequelize-typescript';
import { v4 as uuid } from 'uuid';
import CustomerModel from '../db/sequelize/model/customer.model';
import Customer from '../../domain/entity/customer';
import CustomerRepository from './customer.repository';
import Address from '../../domain/entity/address';

describe('Customer repository unit test', () => {
   let sequelize: Sequelize;

   beforeEach(async () => {
      sequelize = new Sequelize({
         dialect: 'sqlite',
         storage: ':memory:',
         logging: false,
         sync: { force: true },
      });

      sequelize.addModels([CustomerModel]);
      await sequelize.sync();
   });

   afterEach(async () => {
      await sequelize.close();
   });

   it('should create a customer', async () => {
      const customerRepository = new CustomerRepository();
      const customer = new Customer(uuid(), 'Customer 1');
      const address = new Address('Street 1', 1, 'City 1', 'State 1', 'Country 1', 12345);

      customer.addPoints(10);
      customer.changeAddress(address);
      customer.activate();

      await customerRepository.create(customer);
      const foundCustomer = await customerRepository.find(customer.id);

      expect(foundCustomer).not.toBeNull();
      expect(foundCustomer).not.toEqual({});
      expect(foundCustomer).toStrictEqual(customer);
   });

   it('should update a customer', async () => {
      const customerRepository = new CustomerRepository();
      const customer = new Customer(uuid(), 'Customer 1');
      const address = new Address('Street 1', 1, 'City 1', 'State 1', 'Country 1', 12345);

      customer.addPoints(10);
      customer.changeAddress(address);
      customer.activate();

      await customerRepository.create(customer);

      customer.addPoints(20);
      customer.deactivate();

      await customerRepository.update(customer);
      const foundCustomer = await customerRepository.find(customer.id);

      expect(foundCustomer.rewardPoints).toBe(30);
      expect(foundCustomer.isActive()).toBeFalsy();
   });

   it('should throw an error when updating with invalid UUID', async () => {
      const customerRepository = new CustomerRepository();
      const customer = new Customer(uuid(), 'Customer 1');
      const address = new Address('Street 1', 1, 'City 1', 'State 1', 'Country 1', 12345);

      customer.addPoints(10);
      customer.changeAddress(address);
      customer.activate();

      await customerRepository.create(customer);

      const updateCustomer = { ...customer, id: 'invalid-uuid' } as Customer;

      await expect(customerRepository.update(updateCustomer)).rejects.toThrow(
         'Customer not found!',
      );
   });

   it('should update customer address', async () => {
      const customerRepository = new CustomerRepository();
      const customer = new Customer(uuid(), 'Customer 1');
      const address = new Address('Street 1', 1, 'City 1', 'State 1', 'Country 1', 12345);

      customer.addPoints(10);
      customer.changeAddress(address);
      customer.activate();

      await customerRepository.create(customer);

      const newAddress = new Address('Street 2', 2, 'City 2', 'State 2', 'Country 2', 54321);
      customer.changeAddress(newAddress);

      await customerRepository.updateAddress(customer);
      const foundCustomer = await customerRepository.find(customer.id);

      expect(foundCustomer.address).toStrictEqual(newAddress);
   });

   it('should throw an error when updating address with invalid UUID', async () => {
      const customerRepository = new CustomerRepository();
      const customer = new Customer(uuid(), 'Customer 1');
      const address = new Address('Street 1', 1, 'City 1', 'State 1', 'Country 1', 12345);

      customer.addPoints(10);
      customer.changeAddress(address);
      customer.activate();

      await customerRepository.create(customer);

      const newAddress = new Address('Street 2', 2, 'City 2', 'State 2', 'Country 2', 54321);
      const updateCustomer = { ...customer, id: 'invalid-uuid', address: newAddress } as Customer;

      await expect(customerRepository.updateAddress(updateCustomer)).rejects.toThrow(
         'Customer not found!',
      );
   });

   it('should throw an error when trying to find a customer with invalid UUID', async () => {
      const customerRepository = new CustomerRepository();
      await expect(customerRepository.find('invalid-uuid')).rejects.toThrow('Customer not found!');
   });

   it('should return a list of customers', async () => {
      const customerRepository = new CustomerRepository();
      const customer1 = new Customer(uuid(), 'Customer 1');
      const address1 = new Address('Street 1', 1, 'City 1', 'State 1', 'Country 1', 12345);

      customer1.addPoints(10);
      customer1.changeAddress(address1);
      customer1.activate();

      const customer2 = new Customer(uuid(), 'Customer 2');
      const address2 = new Address('Street 2', 2, 'City 2', 'State 2', 'Country 2', 54321);

      customer2.addPoints(20);
      customer2.changeAddress(address2);
      customer2.activate();

      await customerRepository.create(customer1);
      await customerRepository.create(customer2);

      const customers = await customerRepository.findAll();

      expect(customers).toHaveLength(2);
      expect(customers).toContainEqual(customer1);
      expect(customers).toContainEqual(customer2);
   });
});
