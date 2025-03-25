import ICustomertRepository from '@domain/customer/repository/customer.interface';
import Customer from '@domain/customer/entity/customer';
import { InputCreateCustomerDto, OutputCreateCustomerDto } from './create.customer.dto';
import globalSettings from '../../../../settings';
import CustomerFactory from '@domain/customer/factory/customer.tactory';
import Mapper from '@util/mapper';

export default class CreateCustomerUseCase {
   constructor(private customerRepository: ICustomertRepository) {}

   async execute(input: InputCreateCustomerDto): Promise<OutputCreateCustomerDto> {
      const customerFactory = new CustomerFactory();
      const payload = {
         name: input.name,
         address: input.address,
         points: globalSettings.customer.pointsRules.creation,
         type: input.type || 'pf',
      };

      const customer = customerFactory.create(payload);
      await this.customerRepository.create(customer);

      return Mapper.convertTo<Customer, OutputCreateCustomerDto>(customer, ['notification']);
   }
}
