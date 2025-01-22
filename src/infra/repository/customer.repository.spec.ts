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
});
