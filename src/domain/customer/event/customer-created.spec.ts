import { v4 as uuid } from 'uuid';
import Customer from '../entity/customer';
import EnviaConsoleLog1Handler from './handler/envia-console-log-1-handler.ts';
import EnviaConsoleLog2Handler from './handler/envia-console-log-2-handler';
import Address from '../value-object/address';
import CustomerCreated from './customer-created';
import EventDispatcher from '../../@shared/event/event-dispatcher';

describe('Customer created event unit test', () => {
   it('should create a customer and trigger a new event', () => {
      const customer = new Customer(uuid(), 'Willy Wonka');
      const address = new Address('Street', 12, 'City', 'State', 'Country', 12345678);

      customer.addPoints(10);
      customer.changeAddress(address);
      customer.activate();

      const eventDispatcher = new EventDispatcher();
      const enviaConsoleLog1Handler = new EnviaConsoleLog1Handler();
      const enviaConsoleLog2Handler = new EnviaConsoleLog2Handler();

      const spyEventHandler1 = jest.spyOn(enviaConsoleLog1Handler, 'handle');
      const spyEventHandler2 = jest.spyOn(enviaConsoleLog2Handler, 'handle');

      eventDispatcher.register('CustomerCreated', enviaConsoleLog1Handler);
      eventDispatcher.register('CustomerCreated', enviaConsoleLog2Handler);

      expect(eventDispatcher.getEventHandlers['CustomerCreated'].length).toBe(2);

      const customerCreated = new CustomerCreated(customer);
      eventDispatcher.notify(customerCreated);

      expect(spyEventHandler1).toHaveBeenCalled();
      expect(spyEventHandler2).toHaveBeenCalled();
   });
});
