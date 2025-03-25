import ICustomertRepository from '@domain/customer/repository/customer.interface';
import { ICustomer } from '../../../domain/customer/entity/customer.interface';
import { InputFindCustomerDto, OutputFindCustomerDto } from './find.customer.dto';
import Mapper from '@util/mapper';

export default class FindCustomerUseCase {
   constructor(private customerRepository: ICustomertRepository) {}

   async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
      let customer = await this.customerRepository.find(input.id);
      return Mapper.convertTo<ICustomer, OutputFindCustomerDto>(customer, ['notification']);
   }
}
