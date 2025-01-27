import { v4 as uuid } from 'uuid';
import Customer from "../../entity/customer";
import EventDispatcher from "../@shared/event-dispatcher";
import Address from '../../entity/address';
import EnviaConsoleLogHandler from './handler/envia-console-log-handler';
import AddressUpdated from './address-updated';

describe('Address updated event unit test', () => {
   it('should trigger a new event when address changed', () => {
      const customer = new Customer(uuid(), 'Willy Wonka');
      const address = new Address('Street', 12, 'City', 'State', 'Country', 12345678);

      customer.addPoints(10);
      customer.changeAddress(address)
      customer.activate();

      expect(customer.address).toStrictEqual(address);

      const eventDispatcher = new EventDispatcher();
      const enviaConsoleLogHandler = new EnviaConsoleLogHandler();
      const spyConsoleLogHandler = jest.spyOn(enviaConsoleLogHandler, 'handle');

      eventDispatcher.register('AddressUpdated', enviaConsoleLogHandler);
      expect(eventDispatcher.getEventHandlers['AddressUpdated'].length).toBe(1);

      const addressUpdate = new AddressUpdated({
         id: customer.id,
         name: customer.name,
         address: customer.address,
      });

      eventDispatcher.notify(addressUpdate);
      expect(spyConsoleLogHandler).toHaveBeenCalled();
   });
});
