import IEventHandler from '@domain/@shared/event/event-handler.interface';
import CustomerCreated from '../customer-created';

export default class EnviaConsoleLog2Handler implements IEventHandler<CustomerCreated> {
   handle(event: CustomerCreated): void {
      console.log('Esse é o segundo console.log do evento: CustomerCreated');
   }
}
