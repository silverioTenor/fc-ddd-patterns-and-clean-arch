import ICustomertRepository from '@domain/customer/repository/customer.interface';
import { OutputListCustomerDto } from './list.customer.dto';
import { ICustomer } from '../../../domain/customer/entity/customer.interface';

export default class ListCustomerUseCase {
   constructor(private customerRepository: ICustomertRepository) {}

   async execute(): Promise<OutputListCustomerDto[]> {
      const customerList = this.customerRepository.findAll();

      return (await customerList).map((customer: ICustomer) => {
         return {
            id: customer.getId(),
            name: customer.getName(),
            active: customer.isActive(),
            rewardPoints: customer.getRewardPoints(),
            address: {
               street: customer.getAddress().getStreet(),
               number: customer.getAddress().getNumber(),
               city: customer.getAddress().getCity(),
               state: customer.getAddress().getState(),
               country: customer.getAddress().getCountry(),
               postalCode: customer.getAddress().getPostalCode(),
            },
         };
      });
   }
}
