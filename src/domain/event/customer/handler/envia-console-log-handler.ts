import IEventHandler from '../../@shared/event-handler.interface';
import CustomerCreated from '../customer-created';

export default class EnviaConsoleLogHandler implements IEventHandler<CustomerCreated> {
   handle(event: CustomerCreated): void {
      console.log(
         `Endereço do cliente: ${event.eventData.id}, ${event.eventData.name} alterado para: ${event.eventData.address}`,
      );
   }
}
