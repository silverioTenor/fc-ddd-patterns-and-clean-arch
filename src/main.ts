import { ICustomer } from './domain/customer/entity/customer.interface';
import CustomerFactory from './domain/customer/factory/customer.tactory';
import Address from './domain/customer/value-object/address';
import { OutputListCustomerDto } from './usecase/customer/list/list.customer.dto';
import Mapper from './util/mapper';

const factory = new CustomerFactory();
const customer = factory.create({
   type: 'pf',
   name: 'Customer 1',
   points: 10,
   address: new Address('street', 40, 'city', 'state', 'country', 12345678),
});

// console.log(`Customer::`);
// console.log(customer);
const resultMapper = Mapper.convertTo<ICustomer, OutputListCustomerDto>(customer);
console.log(`ResultMapper::`);
console.log(resultMapper);
