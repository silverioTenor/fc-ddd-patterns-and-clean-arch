import ICustomertRepository from '@domain/customer/repository/customer.interface';
import { OutputListCustomerDto } from './list.customer.dto';
import { ICustomer } from '@domain/customer/entity/customer.interface';
import Mapper from '@util/mapper';

export default class ListCustomerUseCase {
   constructor(private customerRepository: ICustomertRepository) {}

   async execute(): Promise<OutputListCustomerDto[]> {
      const customerList = await this.customerRepository.findAll();
      return Mapper.convertListTo<ICustomer, OutputListCustomerDto>(customerList);
   }
}
