import { v4 as uuid} from 'uuid';
import validate from 'uuid-validate';
import OrderItem from './order-item';
import 'dotenv/config';

export default class Order {
   private id: string;
   private customerId: string;
   private items: OrderItem[];

   constructor(customerId: string, items: OrderItem[], id?: string) {
      this.id = !!id ? id : uuid();
      this.customerId = customerId;
      this.items = items;

      this.validate();
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
      if (this.id.length === 0 || validate.version(this.id) !== 4) {
         throw new Error('Id is required!');
      } else if (this.customerId.length === 0 || validate.version(this.customerId) !== 4) {
         throw new Error('Customer id is required!');
      } else if (this.items.length === 0) {
         throw new Error('Must have at least one item!');
      }

      const isQuantityMinor = this.items.some(item => item.getQuantity() <= 0);

      if (isQuantityMinor) {
         throw new Error('Quantity must be greater than zero!');
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
