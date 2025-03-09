import ICustomertRepository from '@domain/customer/repository/customer.interface';
import Customer from '@domain/customer/entity/customer';
import Address from '@domain/customer/value-object/address';
import { InputCreateCustomerDto } from './create.customer.dto';
import globalSettings from '../../../../settings';
import CustomerFactory from '../../../domain/customer/factory/customer.tactory';

export default class CreateCustomerUseCase {
   constructor(private customerRepository: ICustomertRepository) {}

   async execute(input: InputCreateCustomerDto): Promise<void> {
      const customerFactory = new CustomerFactory();
      const payload = {
         name: input.name,
         address: input.address,
         points: globalSettings.customer.pointsRules.creation,
         type: input.type,
      };

      const customer = customerFactory.create(payload);
      await this.customerRepository.create(customer);
   }
}
