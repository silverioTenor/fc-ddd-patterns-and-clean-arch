import CustomerFactory from '@domain/customer/factory/customer.tactory';
import ICustomertRepository from '@domain/customer/repository/customer.interface';
import { InputUpdateAddressDto } from './update.customer.dto';

export default class UpdateAddressUseCase {
   constructor(private customerRepository: ICustomertRepository) {}

   async execute(input: InputUpdateAddressDto): Promise<void> {
      const foundCustomer = await this.customerRepository.find(input.id);

      const factory = new CustomerFactory();
      const payload = {
         id: input.id,
         name: foundCustomer.getName(),
         address: input.address,
         type: input.type,
         points: foundCustomer.getRewardPoints(),
      };

      const customer = factory.create(payload);
      await this.customerRepository.update(customer);
   }
}
