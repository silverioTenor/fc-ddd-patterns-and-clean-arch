import Customer from '@domain/customer/entity/customer';
import ICustomertRepository from '@domain/customer/repository/customer.interface';
import Address from '@domain/customer/value-object/address';
import CustomerModel from '../model/customer.model';
import HttpNotFound from '@infra/api/errors/http.not.found.error';

export default class CustomerRepository implements ICustomertRepository {
   async create(entity: Customer): Promise<void> {
      await CustomerModel.create({
         id: entity.getId(),
         name: entity.getName(),
         active: entity.isActive(),
         rewardPoints: entity.getRewardPoints(),
         street: entity.getAddress().getStreet(),
         number: entity.getAddress().getNumber(),
         city: entity.getAddress().getCity(),
         state: entity.getAddress().getState(),
         country: entity.getAddress().getCountry(),
         postalCode: entity.getAddress().getPostalCode(),
      });
   }

   async update(entity: Customer): Promise<void> {
      const customer = await CustomerModel.findOne({
         where: { id: entity.getId() },
         rejectOnEmpty: true,
      });

      if (!!customer) {
         await customer.update(
            {
               name: entity.getName(),
               active: entity.isActive(),
               rewardPoints: entity.getRewardPoints(),
            },
            { where: { id: entity.getId() } },
         );
      }

      throw new HttpNotFound('Customer not found!');
   }

   async updateAddress(entity: Customer): Promise<void> {
      let customer;

      try {
         customer = await CustomerModel.findOne({
            where: { id: entity.getId() },
            rejectOnEmpty: true,
         });
      } catch (error) {
         throw new Error('Customer not found!');
      }

      await customer.update(
         {
            street: entity.getAddress().getStreet(),
            number: entity.getAddress().getNumber(),
            city: entity.getAddress().getCity(),
            state: entity.getAddress().getState(),
            country: entity.getAddress().getCountry(),
            postalCode: entity.getAddress().getPostalCode(),
         },
         { where: { id: entity.getId() } },
      );
   }

   async find(id: string): Promise<Customer> {
      const customerModel = await CustomerModel.findOne({ where: { id }, rejectOnEmpty: true });

      if (!!customerModel) {
         const customer = new Customer(customerModel.name, customerModel.id);
         const address = new Address(
            customerModel.street,
            customerModel.number,
            customerModel.city,
            customerModel.state,
            customerModel.country,
            customerModel.postalCode,
         );

         customer.addPoints(customerModel.rewardPoints);
         customer.changeAddress(address);
         customerModel.active ? customer.activate() : customer.deactivate();

         return customer;
      }

      throw new HttpNotFound('Customer not found!');
   }

   async findAll(): Promise<Customer[]> {
      const customerModel = await CustomerModel.findAll();
      const customers = customerModel.map(customer => {
         const customerInstance = new Customer(customer.name, customer.id);
         const address = new Address(
            customer.street,
            customer.number,
            customer.city,
            customer.state,
            customer.country,
            customer.postalCode,
         );

         customerInstance.addPoints(customer.rewardPoints);
         customerInstance.changeAddress(address);
         customer.active ? customerInstance.activate() : customerInstance.deactivate();

         return customerInstance;
      });

      return customers;
   }
}
