import CustomerFactory from '../../../domain/customer/factory/customer.tactory';
import ICustomertRepository from '../../../domain/customer/repository/customer.interface';
import { InputUpdateCustomerDto } from './update.customer.dto';


export default class UpdateCustomerUseCase {
   constructor(private customerRepository: ICustomertRepository) {}

   async execute(input: InputUpdateCustomerDto): Promise<void> {
      const foundCustomer = await this.customerRepository.find(input.id);

      const factory = new CustomerFactory();
      const payload = {
         name: input.name,
         address: foundCustomer.address,
         type: input.type,
         points: foundCustomer.rewardPoints,
      };

      const customer = factory.create(payload);
      customer.recoverIdWhenComingFromStorage(input.id);
      await this.customerRepository.update(customer);
   }
}
