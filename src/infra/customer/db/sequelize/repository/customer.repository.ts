import Customer from '@domain/customer/entity/customer';
import ICustomertRepository from '@domain/customer/repository/customer.interface';
import Address from '@domain/customer/value-object/address';
import CustomerModel from '../model/customer.model';

export default class CustomerRepository implements ICustomertRepository {
   async create(entity: Customer): Promise<void> {
      await CustomerModel.create({
         id: entity.id,
         name: entity.name,
         active: entity.isActive(),
         rewardPoints: entity.rewardPoints,
         street: entity.address.street,
         number: entity.address.number,
         city: entity.address.city,
         state: entity.address.state,
         country: entity.address.country,
         postalCode: entity.address.postalCode,
      });
   }

   async update(entity: Customer): Promise<void> {
      let customer;

      try {
         customer = await CustomerModel.findOne({ where: { id: entity.id }, rejectOnEmpty: true });
      } catch (error) {
         throw new Error('Customer not found!');
      }

      await customer.update(
         {
            name: entity.name,
            active: entity.isActive(),
            rewardPoints: entity.rewardPoints,
         },
         { where: { id: entity.id } },
      );
   }

   async updateAddress(entity: Customer): Promise<void> {
      let customer;

      try {
         customer = await CustomerModel.findOne({
            where: { id: entity.id },
            rejectOnEmpty: true,
         });
      } catch (error) {
         throw new Error('Customer not found!');
      }

      await customer.update(
         {
            street: entity.address.street,
            number: entity.address.number,
            city: entity.address.city,
            state: entity.address.state,
            country: entity.address.country,
            postalCode: entity.address.postalCode,
         },
         { where: { id: entity.id } },
      );
   }

   async find(id: string): Promise<Customer> {
      let customerModel;

      try {
         customerModel = await CustomerModel.findOne({ where: { id }, rejectOnEmpty: true });
      } catch (error) {
         throw new Error('Customer not found!');
      }

      const customer = new Customer(customerModel.name);
      const address = new Address(
         customerModel.street,
         customerModel.number,
         customerModel.city,
         customerModel.state,
         customerModel.country,
         customerModel.postalCode,
      );

      customer.recoverIdWhenComingFromStorage(customerModel.id);
      customer.addPoints(customerModel.rewardPoints);
      customer.changeAddress(address);
      customerModel.active ? customer.activate() : customer.deactivate();

      return customer;
   }

   async findAll(): Promise<Customer[]> {
      const customerModel = await CustomerModel.findAll();
      const customers = customerModel.map(customer => {
         const customerInstance = new Customer(customer.name);
         const address = new Address(
            customer.street,
            customer.number,
            customer.city,
            customer.state,
            customer.country,
            customer.postalCode,
         );

         customerInstance.recoverIdWhenComingFromStorage(customer.id);
         customerInstance.addPoints(customer.rewardPoints);
         customerInstance.changeAddress(address);
         customer.active ? customerInstance.activate() : customerInstance.deactivate();

         return customerInstance;
      });

      return customers;
   }
}
