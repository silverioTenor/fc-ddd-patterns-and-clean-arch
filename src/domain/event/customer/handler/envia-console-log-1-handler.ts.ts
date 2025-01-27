import IEventHandler from '../../@shared/event-handler.interface';
import CustomerCreated from '../customer-created';

export default class EnviaConsoleLog1Handler implements IEventHandler<CustomerCreated> {
   handle(event: CustomerCreated): void {
      console.log('Esse é o primeiro console.log do evento: CustomerCreated');
   }
}
