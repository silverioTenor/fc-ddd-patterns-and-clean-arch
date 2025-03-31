import { toXML } from 'jstoxml';
import { OutputListCustomerDto } from '@usecase/customer/list/list.customer.dto';

export default class CustomerPresenter {
   static convertToXML(data: OutputListCustomerDto) {
      const xmlOptions = {
         header: true,
         indent: ' ',
         newline: '\n',
         allowEmpty: true,
      };

      return toXML(
         {
            customers: {
               customer: data.customers,
            },
         },
         xmlOptions,
      );
   }
}
