import CustomerFactory from '../../../domain/customer/factory/customer.tactory';
import ICustomertRepository from '../../../domain/customer/repository/customer.interface';
import { InputUpdateCustomerDto } from './update.customer.dto';


export default class UpdateCustomerUseCase {
   constructor(private customerRepository: ICustomertRepository) {}

   async execute(input: InputUpdateCustomerDto): Promise<void> {
      const foundCustomer = await this.customerRepository.find(input.id);

      const factory = new CustomerFactory();
      const payload = {
         id: input.id,
         name: input.name,
         address: foundCustomer.getAddress(),
         type: input.type,
         points: foundCustomer.getRewardPoints(),
      };

      const customer = factory.create(payload);
      await this.customerRepository.update(customer);
   }
}
