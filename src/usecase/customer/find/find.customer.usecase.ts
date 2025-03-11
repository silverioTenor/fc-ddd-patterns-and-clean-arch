import ICustomertRepository from '@domain/customer/repository/customer.interface';
import { InputFindCustomerDto, OutputFindCustomerDto } from './find.customer.dto';
import Customer from '@domain/customer/entity/customer';

export default class FindCustomerUseCase {
   constructor(private customerRepository: ICustomertRepository) {}

   async execute(input: InputFindCustomerDto): Promise<OutputFindCustomerDto> {
      let customer = await this.customerRepository.find(input.id);

      return !!customer
         ? {
              id: customer.getId(),
              name: customer.getName(),
              address: {
               street: customer.getAddress().getStreet(),
               number: customer.getAddress().getNumber(),
               city: customer.getAddress().getCity(),
               state: customer.getAddress().getState(),
               country: customer.getAddress().getCountry(),
               postalCode: customer.getAddress().getPostalCode(),
            },
           }
         : ({} as OutputFindCustomerDto);
   }
}
