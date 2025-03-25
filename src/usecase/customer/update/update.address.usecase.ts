import CustomerFactory from '@domain/customer/factory/customer.tactory';
import ICustomertRepository from '@domain/customer/repository/customer.interface';
import { InputUpdateAddressDto, OutputUpdateCustomerDto } from './update.customer.dto';
import Mapper from '@util/mapper';
import Customer from '@domain/customer/entity/customer';

export default class UpdateAddressUseCase {
   constructor(private customerRepository: ICustomertRepository) {}

   async execute(input: InputUpdateAddressDto): Promise<OutputUpdateCustomerDto> {
      const foundCustomer = await this.customerRepository.find(input.id);

      const factory = new CustomerFactory();
      const payload = {
         id: input.id,
         name: foundCustomer.getName(),
         address: input.address,
         type: input.type || 'pf',
         points: foundCustomer.getRewardPoints(),
      };

      const customer = factory.create(payload);
      await this.customerRepository.updateAddress(customer);

      return Mapper.convertTo<Customer, OutputUpdateCustomerDto>(customer, ['notification']);
   }
}
