import SendMailWhenProductIsCreatedHandler from '../product/handler/send-mail-when-product-is-created.handler';
import ProductCreatedEvent from '../product/product-created.event';
import EventDispatcher from './event-dispatcher';

describe('Domain events unit tests', () => {
   it('should register an new event handler', () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendMailWhenProductIsCreatedHandler();

      eventDispatcher.register('ProductCreatedEvent', eventHandler);

      expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();
      expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(1);
      expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toStrictEqual(
         eventHandler,
      );
   });

   it('should unregister an event handler', () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendMailWhenProductIsCreatedHandler();

      eventDispatcher.register('ProductCreatedEvent', eventHandler);
      expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();

      eventDispatcher.unregister('ProductCreatedEvent', eventHandler);
      expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'][0]).toBeUndefined();
   });

   it('should unregister all event handlers', () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendMailWhenProductIsCreatedHandler();

      eventDispatcher.register('ProductCreatedEvent', eventHandler);
      expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();
      expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(1);

      eventDispatcher.unregisterAll();
      expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeUndefined();
   });

   it('should notify all event handlers', () => {
      const eventDispatcher = new EventDispatcher();
      const eventHandler = new SendMailWhenProductIsCreatedHandler();
      const spyEventHandler = jest.spyOn(eventHandler, 'handle');

      eventDispatcher.register('ProductCreatedEvent', eventHandler);
      expect(eventDispatcher.getEventHandlers['ProductCreatedEvent']).toBeDefined();
      expect(eventDispatcher.getEventHandlers['ProductCreatedEvent'].length).toBe(1);

      const productCreatedEvent = new ProductCreatedEvent({
         name: 'Product One',
         quantity: 2,
         price: 20
      });

      eventDispatcher.notify(productCreatedEvent);
      expect(spyEventHandler).toHaveBeenCalled();
   });
});
