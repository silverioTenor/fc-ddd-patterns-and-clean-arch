import { IFactory, IPayload } from '../../@shared/factory/factory.interface';
import Customer from '../entity/customer';
import CustomerPj from '../entity/customer-pj';

export default class CustomerFactory implements IFactory<Customer | CustomerPj> {
   create(payload: IPayload): Customer | CustomerPj {
      const { id, type, name, companyName, tradeName, cnpj, points, address } = payload;
      let customer;

      switch (type) {
         case 'pf':
            customer = new Customer(name, id);
            break;
         case 'pj':
            customer = new CustomerPj(companyName, tradeName, cnpj);
            break;
         default:
            throw new Error('Customer type not allowed');
      }

      customer.changeAddress(address);
      customer.addPoints(points);

      if(customer.address.city.length > 0) {
         customer.activate();
      }

      return customer;
   }
}
