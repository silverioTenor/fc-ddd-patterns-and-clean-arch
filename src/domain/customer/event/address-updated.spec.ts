import { v4 as uuid } from 'uuid';
import Customer from '../entity/customer';
import Address from '../value-object/address';
import EnviaConsoleLogHandler from './handler/envia-console-log-handler';
import AddressUpdated from './address-updated';
import EventDispatcher from '../../@shared/event/event-dispatcher';

describe('Address updated event unit test', () => {
   it('should trigger a new event when address changed', () => {
      const customer = new Customer('Willy Wonka');
      const address = new Address('Street', 12, 'City', 'State', 'Country', 12345678);

      customer.addPoints(10);
      customer.changeAddress(address);
      customer.activate();

      expect(customer.getAddress()).toStrictEqual(address);

      const eventDispatcher = new EventDispatcher();
      const enviaConsoleLogHandler = new EnviaConsoleLogHandler();
      const spyConsoleLogHandler = jest.spyOn(enviaConsoleLogHandler, 'handle');

      eventDispatcher.register('AddressUpdated', enviaConsoleLogHandler);
      expect(eventDispatcher.getEventHandlers['AddressUpdated'].length).toBe(1);

      const addressUpdate = new AddressUpdated({
         id: customer.getId(),
         name: customer.getName,
         address: customer.getAddress(),
      });

      eventDispatcher.notify(addressUpdate);
      expect(spyConsoleLogHandler).toHaveBeenCalled();
   });
});
