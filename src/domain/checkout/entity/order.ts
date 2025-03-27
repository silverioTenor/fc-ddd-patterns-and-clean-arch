import { v4 as uuid} from 'uuid';
import validate from 'uuid-validate';
import OrderItem from './order-item';
import 'dotenv/config';
import Entity from '@domain/@shared/entity/entity.abstract';
import NotificationError from '@domain/@shared/notification/notification.error';

export default class Order extends Entity {
   private id: string;
   private customerId: string;
   private items: OrderItem[];

   constructor(customerId: string, items: OrderItem[], id?: string) {
      super();
      this.id = !!id ? id : uuid();
      this.customerId = customerId;
      this.items = items;

      this.validate();

      if (this.notification.hasErrors()) {
         throw new NotificationError(this.notification.getErrors());
      }
   }

   getId() {
      return this.id;
   }

   getCustomerId() {
      return this.customerId;
   }

   getItems() {
      return this.items;
   }

   validate() {
      if (!(!!this.id) || validate.version(this.id) !== 4) {
         this.notification.addError({
            context: this.constructor.name.toLowerCase(),
            message: 'ID is required!',
         });
      }
      if (!(!!this.customerId) || validate.version(this.customerId) !== 4) {
         this.notification.addError({
            context: this.constructor.name.toLowerCase(),
            message: 'Customer ID is required!',
         });
      }
      if (!!this.items && this.items.length <= 0) {
         this.notification.addError({
            context: this.constructor.name.toLowerCase(),
            message: 'Must have at least one item!',
         });
      }

      const isQuantityMinor = this.items.some((item: any) => item.quantity <= 0);

      if (isQuantityMinor) {
         this.notification.addError({
            context: this.constructor.name.toLowerCase(),
            message: 'Quantity must be greater than zero!',
         });
      }
   }

   addItem(item: OrderItem) {
      this.items.push(item);
   }

   removeItem(item: OrderItem) {
      const index = this.items.indexOf(item);
      if (index > -1) {
         this.items.splice(index, 1);
      }
   }

   total() {
      return this.items.reduce((acc, item) => acc + item.orderItemTotal(), 0);
   }

   toString() {
      return `Order #${this.id} - Customer #${this.customerId}`;
   }
}
