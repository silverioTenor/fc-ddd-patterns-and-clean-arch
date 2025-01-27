import IEventDispatcher from './event-dispatcher.interface';
import IEventHandler from './event-handler.interface';
import IEvent from './event.interface';

type IEventHandlerRegister = { [eventName: string]: IEventHandler[] };

export default class EventDispatcher implements IEventDispatcher {
   private eventHandlers: IEventHandlerRegister = {};

   get getEventHandlers(): IEventHandlerRegister {
      return this.eventHandlers;
   }

   notify(event: IEvent): void {
      const eventName = event.constructor.name;

      if (this.eventHandlers[eventName]) {
         this.eventHandlers[eventName].forEach(eventHandler => eventHandler.handle(event));
      }
   }
   register(eventName: string, eventHandler: IEventHandler): void {
      if (!this.eventHandlers[eventName]) {
         this.eventHandlers[eventName] = [];
      }
      this.eventHandlers[eventName].push(eventHandler);
   }
   unregister(eventName: string, eventHandler: IEventHandler): void {
      if (this.eventHandlers[eventName]) {
         const index = this.eventHandlers[eventName].indexOf(eventHandler);

         if (index !== -1) {
            this.eventHandlers[eventName].splice(index, 1);
         }
      }
   }
   unregisterAll(): void {
      this.eventHandlers = {};
   }
}
