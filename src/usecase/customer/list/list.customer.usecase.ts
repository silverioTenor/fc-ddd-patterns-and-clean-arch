import ICustomertRepository from '@domain/customer/repository/customer.interface';
import { OutputListCustomerDto } from './list.customer.dto';
import Mapper from '@util/mapper';
import { ICustomer } from '@domain/customer/entity/customer.interface';

export default class ListCustomerUseCase {
   constructor(private customerRepository: ICustomertRepository) {}

   async execute(): Promise<OutputListCustomerDto> {
      let outputListCustomerDto: OutputListCustomerDto = { customers: [] };

      const customerList = await this.customerRepository.findAll();

      const customers = Mapper.convertListTo<ICustomer, ICustomer>(customerList, ['notification']);

      outputListCustomerDto.customers = customers as any;
      return outputListCustomerDto;
   }
}
