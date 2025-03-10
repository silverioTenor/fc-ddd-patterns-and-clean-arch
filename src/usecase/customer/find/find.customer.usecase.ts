import ICustomertRepository from '@domain/customer/repository/customer.interface';
import { InputFindCustomerDto, OutputFindCustomerDto } from './find.customer.dto';
import Customer from '@domain/customer/entity/customer';

export default class FindCustomerUseCase {
   constructor(private customerRepository: ICustomertRepository) {}

   async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
      let customer = await this.customerRepository.find(input.id);

      return !!customer
         ? {
              id: customer.id,
              name: customer.name,
              address: {
               street: customer.address.getStreet(),
               number: customer.address.getNumber(),
               city: customer.address.getCity(),
               state: customer.address.getState(),
               country: customer.address.getCountry(),
               postalCode: customer.address.getPostalCode(),
            },
           }
         : ({} as OutputFindCustomerDto);
   }
}
